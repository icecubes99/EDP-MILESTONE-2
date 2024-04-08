"use client";

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'
import ReactDatetimeClass from 'react-datetime';
import { Moment } from 'moment';

const AddLeave = ({ params }: { params: { id: string } }) => {
    const [formData, setFormData] = useState({
        employeeId: params.id,

        leaveType: '',
        startDate: '',
        endDate: '',
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


    // const [startDate, setStartDate] = useState<Date>()
    const handleDateChange = (date: string | Moment, name: string) => {
        let dateString: string;

        if (typeof date === 'string') {
            dateString = new Date(date).toISOString();
        } else {
            dateString = date.toDate().toISOString();
        }

        setFormData((prevData) => (
            {
                ...prevData,
                [name]: dateString
            }
        ));

        console.log(formData);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.leaveType || !formData.startDate || !formData.endDate) {
            setError("Please fill in all fields");
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch('/api/leaves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    employeeId: formData.employeeId,
                    leaveType: formData.leaveType,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
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
        <div>
            <h1 className="text-2xl font-bold ml-10 mt-10">REQUEST LEAVE</h1>
            <form className='flex flex-col mt-10 ml-10' onSubmit={handleSubmit}>
                <div>
                    <h1 className='font-bold text-lg'>LEAVE TYPE</h1>
                    <select
                        name='leaveType'
                        id='leaveType'
                        className="w-[357px]  p-2 border border-gray-200 bg-indigo-50"
                        onChange={handleInputChange}
                    >
                        <option value=''>Select Leave Type</option>
                        <option value='Vacation Leave'>Vacation Leave</option>
                        <option value='Sick Leave'>Sick Leave</option>
                        <option value='Emergency Leave'>Emergency Leave</option>
                    </select>
                </div>

                <div className='flex flex-row'>
                    <div className='mt-5'>
                        <h1 className='font-bold text-lg'>START DATE</h1>
                        <ReactDatetimeClass
                            dateFormat="YYYY-MM-DD"
                            timeFormat="HH:mm:ss.SSS"
                            onChange={(date) => handleDateChange(date, 'startDate')}
                        />
                    </div>

                    <div className='mt-5 ml-10'>
                        <h1 className='font-bold text-lg'>END DATE</h1>
                        <ReactDatetimeClass
                            dateFormat="YYYY-MM-DD"
                            timeFormat="HH:mm:ss.SSS"
                            isValidDate={(currentDate) => {
                                return currentDate.isAfter(new Date(formData.startDate));
                            }}
                            onChange={(date) => handleDateChange(date, 'endDate')}
                            className=''
                        />
                    </div>
                </div>

                <button className='bg-black text-white font-bold text-2xl mt-10 p-5 w-[300px] rounded-md cursor-pointer hover:bg-slate-500'
                    type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "ADD LEAVE"}
                </button>
            </form>
            {error && <p className='text-red-500 mt-4 ml-10'>{error}</p>}
        </div>
    )
}

export default AddLeave