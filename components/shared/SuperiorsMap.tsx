"use client"
import React, { useEffect, useState } from 'react'

interface SignatoriesData {
    id: string;
    employeeId: string;
    higherSuperiorId: string;
    status: string;
    employee: {
        firstName: String;
        lastName: String;
    }
    higherSuperior: {
        firstName: String;
        lastName: String;
    }
}

const SuperiorsMap = () => {
    const [data, setData] = useState<SignatoriesData[]>([]);

    const makeApiCall = async () => {
        const response = await fetch("/api/signatories", {
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
            <div className='flex flex-col'>
                <div>
                    <h1 className="pt-10 text-3xl font-bold mb-10">HIGHER SUPERIORS TABLE</h1>
                    <table className="border-stone-500 w-full border ">
                        <thead>
                            <tr className="text-black font-semibold text-lg ">
                                <th className="border px-10 py-2  bg-indigo-50">EMPLOYEE</th>
                                <th className="border px-10 py-2  bg-indigo-50">HIGHER SUPERIOR</th>
                                <th className="border px-10 py-2  bg-indigo-50">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((signatories, id) => (
                                <tr key={id}>
                                    <td className="border px-10 py-2 text-center">
                                        {signatories.employee.lastName}, {signatories.employee.firstName}
                                    </td>
                                    <td className="border px-10 py-2 text-purple-600 text-center">
                                        {signatories.higherSuperior.lastName}, {signatories.higherSuperior.firstName}
                                    </td>
                                    <td className="border px-10 py-2 text-center">
                                        {signatories.status}
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

export default SuperiorsMap