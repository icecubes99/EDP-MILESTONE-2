"use client";

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'
import EmployeeSelection from '../ui/EmployeeSelection';

const AssignSuperior = () => {
    const [formData, setFormData] = useState({
        employeeId: '',
        higherSuperiorId: '',
        status: ''
    })

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ));

        console.log(formData);
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.employeeId || !formData.higherSuperiorId || !formData.status) {
            setError("Please fill in all fields");
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch('/api/signatories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    employeeId: formData.employeeId,
                    higherSuperiorId: formData.higherSuperiorId,
                    status: formData.status
                })
            })

            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            router.push('/employeeManagement')
        } catch (error) {
            setError('Something went wrong. Please Try Again later');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='mt-10'>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <h1 className='font-bold text-lg'>SELECT EMPLOYEE</h1>
                    <EmployeeSelection name='employeeId' onChange={handleInputChange} />
                </div>
                <div className='mt-10'>
                    <h1 className='font-bold text-lg'>SELECT HIGHER SUPERIOR</h1>
                    <EmployeeSelection name='higherSuperiorId' onChange={handleInputChange} />
                </div>
                <div className='mt-10'>
                    <h1 className='font-bold text-lg'>STATUS</h1>
                    <select
                        name='status'
                        id='status'
                        className="w-[357px]  p-2 border border-gray-200 bg-indigo-50"
                        onChange={handleInputChange}
                    >
                        <option value=''>Select Status</option>
                        <option value='Active'>Active</option>
                        <option value='Inactive'>Inactive</option>
                    </select>
                </div>
                <button className='bg-black text-white font-bold text-2xl mt-10 p-5 w-[300px] rounded-md cursor-pointer hover:bg-slate-500'
                    type="submit" disabled={isLoading}>
                    {isLoading ? "Assigning..." : "ASSIGN SUPERIOR"}
                </button>
            </form>
            {error && <p className='text-red-500 mt-4 ml-10'>{error}</p>}
        </div>
    )
}

export default AssignSuperior