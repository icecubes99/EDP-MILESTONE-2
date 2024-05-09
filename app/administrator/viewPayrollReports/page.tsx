"use client";

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'
import Sidebar from "@/components/shared/Sidebar";
import UnivHeader from "@/components/shared/UnivHeader";
import Link from "next/link";
import { format } from 'date-fns';

interface EmployeeData {
    id: string
    employeeSpecialId: string
    firstName: string
    lastName: string
    payroll: PayrollData[]
}

interface PayrollData {
    employeeId: string
    periodStart: string
    periodEnd: string
    pay: number
    deductions: DeductionsData[]
    additionalEarnings: AdditionalEarningsData[]
    governmentContributions: GovernmentContributionsData[]
    netPay?: number
}

interface PayrollMonthData {
    payrolls: PayrollData[];
    totalGrossPay: number;
    totalNetPay: number;
}
interface GovernmentContributionsData {
    governmnentContribution: string
    amount: number
}

interface DeductionsData {
    typeOfDeductions: string
    amount: number
}

interface AdditionalEarningsData {
    typeOfEarnings: string
    amount: number
}

const page = ({ params }: { params: { id: string } }) => {
    const [data, setData] = useState<EmployeeData[]>([]);


    const makeApiCall = async () => {
        const response = await fetch(`/api/employee`, { // Fetch all employees
            method: "GET",
        });
        const rawData = await response.json();
        console.log(rawData);

        const processedData = rawData.map((employee: EmployeeData) => {
            const processedPayrolls = employee.payroll.map((payroll: PayrollData) => {
                const totalDeductions = payroll.deductions ? payroll.deductions.reduce((total, deduction) => total + deduction.amount, 0) : 0;
                const totalGovernmentContributions = payroll.governmentContributions ? payroll.governmentContributions.reduce((total, contribution) => total + contribution.amount, 0) : 0;
                const totalAdditionalEarnings = payroll.additionalEarnings ? payroll.additionalEarnings.reduce((total, earning) => total + earning.amount, 0) : 0;
                const netPay = payroll.pay - totalDeductions - totalGovernmentContributions + totalAdditionalEarnings;

                return {
                    ...payroll,
                    totalDeductions,
                    totalGovernmentContributions,
                    totalAdditionalEarnings,
                    netPay,
                };
            });

            return {
                ...employee,
                payroll: processedPayrolls,
            };
        });

        setData(processedData);
        console.log(processedData)
    };

    useEffect(() => {
        makeApiCall();
    }, []);
    // Group payrolls by month
    const payrollsByMonth: { [key: string]: PayrollMonthData } = {};

    data.forEach(employee => {
        if (employee.payroll) { // Check if payroll is defined
            employee.payroll.forEach(payroll => {
                const month = format(new Date(payroll.periodStart), 'MMMM yyyy');
                if (!payrollsByMonth[month]) {
                    payrollsByMonth[month] = {
                        payrolls: [],
                        totalGrossPay: 0,
                        totalNetPay: 0,
                    };
                }
                payrollsByMonth[month].payrolls.push(payroll);
                payrollsByMonth[month].totalGrossPay += payroll.pay;
                payrollsByMonth[month].totalNetPay += payroll.netPay || 0;
            });
        }
    });


    useEffect(() => {
        makeApiCall();
    }, []);
    return (<main>
        <UnivHeader />
        <div className='flex min-h-screen flex-row'>
            <Sidebar />
            <div className='flex flex-col'>
                {Object.entries(payrollsByMonth).map(([month, payrollMonthData], id) => (
                    <div className='ml-10' key={id}>
                        <h1 className="pt-10 text-3xl font-bold">
                            PROGRESS REPORT FOR {month.toUpperCase()}
                        </h1>
                        <h1 className='mt-5 text-lg flex font-medium justify-between'>
                            <span>TOTAL GROSS PAY FOR {month.toUpperCase()}:</span>
                            <span>₱{payrollMonthData.totalGrossPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </h1>
                        <h1 className='mt-2 text-lg font-medium flex justify-between'>
                            <span>TOTAL NET PAY FOR {month.toUpperCase()}:</span>
                            <span>₱{payrollMonthData.totalNetPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </h1>
                        {payrollMonthData.payrolls.map((payroll, index) => {
                            const employee = data.find(emp => emp.id === payroll.employeeId);
                            return (
                                <div key={index}>
                                    <h1 className='mt-10 text-xl font-bold text-purple-500'>
                                        TO {employee?.lastName.toUpperCase()}, {employee?.firstName.toUpperCase()} - {employee?.employeeSpecialId}</h1>
                                    <h1 className='text-lg font-bold'>
                                        FOR THE PERIOD OF {new Date(payroll.periodStart).toLocaleDateString()} - {new Date(payroll.periodEnd).toLocaleDateString()}
                                    </h1>
                                    <h1 className='mt-5 text-lg flex justify-between'>
                                        <span>GROSS PAY</span>
                                        <span style={{ marginLeft: '12em' }}>{payroll.pay.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </h1>
                                    <h1 className='mt-4 text-green-500 text-lg'>
                                        <span>ADDITIONAL EARNINGS</span>
                                    </h1>
                                    {payroll.additionalEarnings && payroll.additionalEarnings.length > 0 ? (
                                        payroll.additionalEarnings.map((earning, index) => (
                                            <h1 key={index} className='flex justify-between'>
                                                <span className='ml-10'>{earning.typeOfEarnings}</span>
                                                <span>{earning.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                            </h1>
                                        ))
                                    ) : (
                                        <h1 className=' ml-10'>
                                            No additional earnings.
                                        </h1>
                                    )}
                                    <h1 className='mt-4 text-red-500 text-lg'>
                                        <span>DEDUCTIONS</span>
                                    </h1>
                                    {payroll.deductions && payroll.deductions.length > 0 ? (
                                        payroll.deductions.map((deduction, index) => (
                                            <h1 key={index} className='flex justify-between'>
                                                <span className='ml-10'>{deduction.typeOfDeductions}</span>
                                                <span>{deduction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                            </h1>
                                        ))
                                    ) : (
                                        <h1 className='ml-10'>
                                            No deductions.
                                        </h1>
                                    )}
                                    <h1 className='mt-4 text-red-500 text-lg'>
                                        <span>GOVERNMENT CONTRIBUTIONS</span>
                                    </h1>
                                    {payroll.governmentContributions && payroll.governmentContributions.length > 0 ? (
                                        payroll.governmentContributions.map((contribution, index) => (
                                            <h1 key={index} className='flex justify-between'>
                                                <span className='ml-10'>{contribution.governmnentContribution}</span>
                                                <span>{contribution.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                            </h1>
                                        ))
                                    ) : (
                                        <h1 className=' ml-10'>
                                            No government contributions.
                                        </h1>
                                    )}
                                    <h1 className='mt-10 text-lg mb-5 pt-2 font-bold border-t-2 flex justify-between'>
                                        <span>NET PAY</span>
                                        <span className='ml-[12em]'> ₱{(payroll.netPay || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </h1>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    </main>
    )
}

export default page