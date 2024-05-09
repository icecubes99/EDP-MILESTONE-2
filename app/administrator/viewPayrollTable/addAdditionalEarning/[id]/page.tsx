"use client";

import Sidebar from '@/components/shared/Sidebar';
import UnivHeader from '@/components/shared/UnivHeader';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'

const page = ({ params }: { params: { id: string } }) => {
    const [formData, setFormData] = useState({
        payrollId: params.id,
        typeOfEarnings: '',
        amount: ''
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

        if (!formData.typeOfEarnings || !formData.amount) {
            setError("Please fill in all fields");
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`/api/payroll/additionalEarnings/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    payrollId: params.id,
                    typeOfEarnings: formData.typeOfEarnings,
                    amount: Number(formData.amount)
                })
            })

            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            router.push('/administrator/viewPayrollTable')
        } catch (error) {
            setError('Something went wrong. Please Try Again later');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <main>
            <UnivHeader />
            <div className='flex flex-row'>
                <Sidebar />
                <div className='flex flex-col'>
                    <h1 className="text-2xl font-bold ml-10 mt-10">ADDITIONAL EARNINGS FORM</h1>
                    <form className='flex flex-col mt-10 ml-10' onSubmit={handleSubmit}>
                        <div>
                            <h1 className='font-bold text-lg'>TYPE OF ADDITIONAL EARNINGS</h1>
                            <select
                                name='typeOfEarnings'
                                id='typeOfEarnings'
                                className="w-[357px] mt-2 p-2 border border-gray-200 bg-indigo-50"
                                onChange={handleInputChange}
                            >
                                <option value=''>Select Type</option>
                                <option value='Overtime'>Overtime</option>
                                <option value='Allowance'>Allowance</option>
                                <option value='Refund'>Refund</option>
                            </select>

                            <div className="flex flex-col mt-10 gap-y-1">
                                <h1 className='font-bold text-lg'>ADDITIONAL EARNING AMOUNT</h1>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    placeholder='Added Amount'
                                    onChange={handleInputChange}
                                    className='w-[357px]  p-2 border border-gray-200 bg-indigo-50 '
                                />
                            </div>
                        </div>

                        <button className='bg-black text-white font-bold text-2xl mt-10 p-5 w-[300px] rounded-md cursor-pointer hover:bg-slate-500'
                            type="submit" disabled={isLoading}>
                            {isLoading ? "Adding..." : "ADD ADDITIONAL EARNING"}
                        </button>
                    </form>
                    {error && <p className='text-red-500 mt-4 ml-10'>{error}</p>}
                </div>
            </div>
        </main>
    )
}

export default page