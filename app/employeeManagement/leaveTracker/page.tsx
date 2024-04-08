"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
import UnivHeader from "@/components/shared/UnivHeader";
import { format } from 'date-fns';
interface LeaveData {
    id: string;
    employeeId: string;
    leaveType: string;
    startDate: Date;
    endDate: Date;
}

interface EmployeeData {
    id: string;
    employeeSpecialId: string;
    firstName: string;
    lastName: string;
}
const page = () => {
    const [data, setData] = useState<LeaveData[]>([]);

    const makeApiCall = async () => {
        const response = await fetch("/api/leaves", {
            method: "GET",
        });
        const data = await response.json();

        console.log(data);
        setData(data);
    };



    useEffect(() => {
        makeApiCall();
    }, []);

    return (
        <main>
            <UnivHeader />
            <div className="flex flex-row">
                <Sidebar />
                <div className="flex flex-col pt-2 pl-1 text-center">
                    <h1 className="pt-10 text-3xl font-bold mb-10 ml-10">
                        LEAVES TRACKER
                    </h1>
                    <table className="border-stone-500 w-full border">
                        <thead>
                            <tr className="text-black font-semibold text-lg">
                                <th className="border px-10 py-2  bg-indigo-50">EMPLOYEE ID</th>
                                <th className="border px-10 py-2  bg-indigo-50">LEAVE TYPE</th>
                                <th className="border px-10 py-2 bg-indigo-50">START DATE</th>
                                <th className="border px-10 py-2 bg-indigo-50">END DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((leave, id) => (
                                <tr key={id}>
                                    <td className="border px-10 py-2 text-center">
                                        {leave.employeeId}
                                    </td>
                                    <td className="border px-10 py-2 text-center">
                                        {leave.leaveType}
                                    </td>
                                    <td className="border px-10 py-2 text-center">
                                        {format(new Date(leave.startDate), 'MMMM-dd-yyyy HH:mm a')}
                                    </td>
                                    <td className="border px-10 py-2 text-center">
                                        {format(new Date(leave.endDate), 'MMMM-dd-yyyy HH:mm a')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default page