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
    assignment: Assign_Designation[]
    createdAt: string
    sssId: string
    philhealthId: string
    tinId: string
    pagibigId: string
}

interface Assign_Designation {
    id: string
    designation: Designation
}
interface Designation {
    id: string
    department: Department
}

interface Department {
    id: string
    departmentName: string
}

interface PayrollData {
    periodStart: string
    periodEnd: string
    pay: number
    deductions: DeductionsData[]
    additionalEarnings: AdditionalEarningsData[]
    governmentContributions: GovernmentContributionsData[]
    netPay?: number
    totalCompensation?: number
    totalDeductions?: number
    totalOverallDeductions?: number
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
            const totalCompensation = payroll.pay + totalAdditionalEarnings; // Add this line
            const totalOverallDeductions = totalDeductions + totalGovernmentContributions;
            return {
                ...payroll,
                totalDeductions,
                totalGovernmentContributions,
                totalAdditionalEarnings,
                netPay,
                totalCompensation,
                totalOverallDeductions
            };
        });

        const processedData = {
            ...rawData,
            payroll: processedPayrolls,
        };

        setData([processedData]); // Set data as an array containing the single employee object
        console.log(processedData)
    };
    function getClosestPayrollDate() {
        const now = new Date();
        const tenth = new Date(now.getFullYear(), now.getMonth(), 10);
        const thirtieth = new Date(now.getFullYear(), now.getMonth(), 30);

        return Math.abs(now.getTime() - tenth.getTime()) < Math.abs(now.getTime() - thirtieth.getTime())
            ? tenth
            : thirtieth;
    }
    useEffect(() => {
        makeApiCall();
    }, []);
    return (
        <main>
            <UnivHeader />
            <div className='flex flex-row'>
                <Sidebar />
                <div className='flex mt-10 flex-col'>
                    {data.map((employee, id) => (
                        <div className='ml-10 w-[1080px]' key={id}>
                            {(() => {
                                const now = new Date();
                                const currentPayrolls = employee.payroll.filter(payroll => {
                                    const periodStart = new Date(payroll.periodStart);
                                    const periodEnd = new Date(payroll.periodEnd);
                                    return now >= periodStart && now <= periodEnd;
                                });

                                if (currentPayrolls.length === 0) {
                                    return <h1 className=' text-lg text-red-500'>No payslips available.</h1>;
                                }

                                return currentPayrolls.map((payroll, index) => (
                                    <div key={index}>

                                        <h1 className='text-center font-bold'>OFFICIAL PAYSLIP</h1>

                                        <div className='flex flex-row'>
                                            <div className='flex-1 border border-gray-500 m-2 p-2'>
                                                <div className='flex flex-row justify-between'>
                                                    <h1>EMPLOYEE:</h1>
                                                    <h1>{employee.lastName.toUpperCase()}, {employee.firstName.toUpperCase()}</h1>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <h1>TIN NUMBER:</h1>
                                                    <h1>{employee.tinId}</h1>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <h1>SSS NUMBER:</h1>
                                                    <h1> {employee.sssId} </h1>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <h1>PHILHEALTH NUMBER:</h1>
                                                    <h1>{employee.philhealthId} </h1>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <h1>HDMF NUMBER:</h1>
                                                    <h1>{employee.pagibigId} </h1>
                                                </div>
                                            </div>
                                            <div className='flex-1 border border-gray-500 m-2 p-2'>
                                                <div className='flex flex-row justify-between'>
                                                    <h1>PAYROLL DATE:</h1>
                                                    <h1>{getClosestPayrollDate().toLocaleDateString()}</h1>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <h1>PAY PERIOD:</h1>
                                                    <h1>{new Date(payroll.periodStart).toLocaleDateString()} - {new Date(payroll.periodEnd).toLocaleDateString()}</h1>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <h1>DEPARTMENT:</h1>
                                                    <h1>{employee.assignment && employee.assignment[0] ? employee.assignment[0].designation.department.departmentName : 'N/A'}</h1>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <h1>DATE OF HIRE:</h1>
                                                    <h1>{new Date(employee.createdAt).toLocaleDateString()}</h1>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <h1>NET HOURLY RATE @--</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-row'>
                                            <div className='flex-1 border border-gray-500 m-2 p-2'>
                                                <div className='flex flex-row justify-between'>
                                                    <h1 className='font-bold'>COMPENSATION:</h1>
                                                    <h1 className='font-bold'>AMOUNT:</h1>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <h1>BASIC PAY</h1>
                                                    <h1>{payroll.pay.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
                                                </div>
                                                {payroll.additionalEarnings && payroll.additionalEarnings.length > 0 ? (
                                                    payroll.additionalEarnings.map((earning, index) => (
                                                        <h1 key={index} className='flex justify-between'>
                                                            <span className=''>{earning.typeOfEarnings.toUpperCase()}</span>
                                                            <span>{earning.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                        </h1>
                                                    ))
                                                ) : (
                                                    <h1>--</h1>
                                                )}
                                                <div className='flex flex-row justify-between'>
                                                    <h1>NIGHT DIFF.</h1>
                                                    <h1>--</h1>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <h1>HOLIDAY PAY</h1>
                                                    <h1>--</h1>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <h1>INTERNET ALLOWANCE</h1>
                                                    <h1>--</h1>
                                                </div>
                                                <div className='flex mt-3 flex-row justify-between'>
                                                    <h1 className='font-bold'>TOTAL COMPENSATION:</h1>
                                                    <h1 className='font-bold'>{(payroll.totalCompensation || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
                                                </div>
                                                <div className='flex mt-3 flex-row justify-between'>
                                                    <h1 className='font-black'>TOTAL NET PAY:</h1>
                                                    <h1 className='font-black'>{(payroll.netPay || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
                                                </div>
                                            </div>

                                            <div className='flex-1 border border-gray-500 m-2 p-2'>
                                                <div className='flex flex-row justify-between'>
                                                    <h1 className='font-bold'>DEDUCTION:</h1>
                                                    <h1 className='font-bold'>AMOUNT:</h1>
                                                </div>
                                                {payroll.governmentContributions && payroll.governmentContributions.length > 0 ? (
                                                    payroll.governmentContributions.map((contribution, index) => (
                                                        <h1 key={index} className='flex justify-between'>
                                                            <span className=''>{contribution.governmnentContribution.toUpperCase()}</span>
                                                            <span>{contribution.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                        </h1>
                                                    ))
                                                ) : (
                                                    <h1>--</h1>
                                                )}
                                                {payroll.deductions && payroll.deductions.length > 0 ? (
                                                    payroll.deductions.map((deduction, index) => (
                                                        <h1 key={index} className='flex justify-between'>
                                                            <span className=''>{deduction.typeOfDeductions.toUpperCase()}</span>
                                                            <span>{deduction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                        </h1>
                                                    ))
                                                ) : (
                                                    <h1 className=' ml-10'>--</h1>
                                                )}
                                                <div className='flex mt-3 flex-row justify-between'>
                                                    <h1 className='font-bold'>TOTAL DEDUCTIONS:</h1>
                                                    <h1 className='font-bold'>{(payroll.totalOverallDeductions || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    ))}

                </div>
            </div>
        </main>
    )
}

export default page