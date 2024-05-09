"use client";

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'
import Sidebar from "@/components/shared/Sidebar";
import UnivHeader from "@/components/shared/UnivHeader";
import Link from "next/link";

interface EmployeeData {
    id: string
    employeeSpecialId: string
    firstName: string
    lastName: string
    payroll: PayrollData[]
}

interface PayrollData {
    periodStart: string
    periodEnd: string
    pay: number
    deductions: DeductionsData[]
    additionalEarnings: AdditionalEarningsData[]
    governmentContributions: GovernmentContributionsData[]
    netPay?: number
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
        const response = await fetch(`/api/employee/${params.id}`, {
            method: "GET",
        });
        const rawData = await response.json();
        console.log(rawData);

        const processedPayrolls = rawData.payroll.map((payroll: PayrollData) => {
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

        const processedData = {
            ...rawData,
            payroll: processedPayrolls,
        };

        setData([processedData]); // Set data as an array containing the single employee object
        console.log(processedData)
    };

    useEffect(() => {
        makeApiCall();
    }, []);
    return (
        <main>
            <UnivHeader />
            <div className='flex flex-row'>
                <Sidebar />
                <div className='flex flex-col'>
                    {data.map((employee, id) => (
                        <div className='ml-10' key={id}>
                            <h1 className="pt-10 text-3xl font-bold mb-10">
                                PAYSLIP OF {employee.lastName.toUpperCase()}, {employee.firstName.toUpperCase()} - {employee.employeeSpecialId}
                            </h1>
                            {employee.payroll.length > 0 ? (
                                employee.payroll.map((payroll, index) => {
                                    const periodStart = new Date(payroll.periodStart);
                                    const periodEnd = new Date(payroll.periodEnd);
                                    const now = new Date();

                                    if (now >= periodStart && now <= periodEnd) {
                                        return (
                                            <div>
                                                <h1 className='text-xl font-bold'>
                                                    FOR THE PERIOD OF {new Date(employee.payroll[0].periodStart).toLocaleDateString()} - {new Date(employee.payroll[0].periodEnd).toLocaleDateString()}
                                                </h1>
                                                <h1 className='mt-10 text-lg font-semibold flex justify-between'>
                                                    <span>GROSS PAY</span>
                                                    <span style={{ marginLeft: '12em' }}>₱{employee.payroll[0].pay.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                </h1>
                                                <h1 className='mt-4 text-green-500 text-lg'>
                                                    <span>ADDITIONAL EARNINGS</span>
                                                </h1>
                                                {employee.payroll[0].additionalEarnings && employee.payroll[0].additionalEarnings.length > 0 ? (
                                                    employee.payroll[0].additionalEarnings.map((earning, index) => (
                                                        <h1 key={index} className='flex justify-between'>
                                                            <span className='ml-10'>{earning.typeOfEarnings}</span>
                                                            <span>{earning.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                        </h1>
                                                    ))
                                                ) : (
                                                    <h1>No Additional Earnings</h1>
                                                )}
                                                <h1 className='mt-4 text-red-500 text-lg'>
                                                    <span>DEDUCTIONS</span>
                                                </h1>

                                                {employee.payroll[0].deductions && employee.payroll[0].deductions.length > 0 ? (
                                                    employee.payroll[0].deductions.map((deduction, index) => (
                                                        <h1 key={index} className='flex justify-between'>
                                                            <span className='ml-10'>{deduction.typeOfDeductions}</span>
                                                            <span>{deduction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                        </h1>
                                                    ))
                                                ) : (
                                                    <h1 className=' ml-10'>No deductions</h1>
                                                )}

                                                <h1 className='mt-4 text-red-500 text-lg'>
                                                    <span>GOVERNMENT CONTRIBUTIONS</span>
                                                </h1>

                                                {employee.payroll[0].governmentContributions && employee.payroll[0].governmentContributions.length > 0 ? (
                                                    employee.payroll[0].governmentContributions.map((contribution, index) => (
                                                        <h1 key={index} className='flex justify-between'>
                                                            <span className='ml-10'>{contribution.governmnentContribution}</span>
                                                            <span>{contribution.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                        </h1>
                                                    ))
                                                ) : (
                                                    <h1>No deductions</h1>
                                                )}
                                                <h1 className='mt-10 text-xl pt-2 font-bold border-t-2 flex justify-between'>
                                                    <span>NET PAY</span>
                                                    <span className='ml-[12em]'> ₱{(payroll.netPay || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                </h1>
                                            </div>)
                                    } else {
                                        return (
                                            <h1 className=' text-lg text-red-500'>
                                                No payslips available.
                                            </h1>
                                        );
                                    }
                                })
                            ) : (
                                <h1 className=' text-lg text-red-500'>
                                    No payslips available.
                                </h1>
                            )}
                        </div>
                    ))}

                </div>
            </div>
        </main>
    )
}

export default page