"use client"
import React, { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import EmployeeSelection from '../ui/EmployeeSelection'
import ReactDatetimeClass from 'react-datetime';
import { Moment } from 'moment';
import ActiveEmployeeSelection from '../ui/ActiveEmployeeSelection';

const GeneratePayroll = () => {
    const [formData, setFormData] = useState({
        employeeId: '',
        pay: "",
        periodStart: '',
        periodEnd: '',
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

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

        if (!formData.employeeId || !formData.pay || !formData.periodEnd || !formData.periodStart) {
            setError("Please fill in all fields");
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch('/api/payroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    employeeId: formData.employeeId,
                    pay: Number(formData.pay),
                    periodStart: formData.periodStart,
                    periodEnd: formData.periodEnd,
                })
            })

            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            router.push('/administrator')
        } catch (error) {
            setError('Something went wrong. Please Try Again later');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='flex flex-col mt-5 ml-10'>

            <h1 className='pt-10 text-3xl font-bold'>Generate Payslip</h1>

            <form className='flex flex-col mt-10' onSubmit={handleSubmit}>
                <div>
                    <h1 className='font-bold text-lg'>Employee</h1>
                    <ActiveEmployeeSelection name='employeeId' onChange={handleInputChange} />
                    <h1 className='font-bold text-lg mt-5'>Pay</h1>
                    <input
                        type="number"
                        name="pay"
                        // value={formData.pay}
                        placeholder='Pay Amount'
                        onChange={handleInputChange}
                        onKeyDown={(event) => {
                            const validKeys = [
                                'Backspace', 'Tab', 'Enter', 'Delete',
                                'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'
                            ];
                            if (!/[0-9]/.test(event.key) && !validKeys.includes(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        className='w-[357px]  p-2 border border-gray-200 bg-indigo-50 '
                    />

                    <div className='flex flex-row'>
                        <div className='mt-5'>
                            <h1 className='font-bold text-lg'>Period Start</h1>
                            <ReactDatetimeClass
                                dateFormat="YYYY-MM-DD"
                                timeFormat="HH:mm:ss.SSS"
                                onChange={(date) => handleDateChange(date, 'periodStart')}
                            />
                        </div>

                        <div className='mt-5 ml-10'>
                            <h1 className='font-bold text-lg'>Period End</h1>
                            <ReactDatetimeClass
                                dateFormat="YYYY-MM-DD"
                                timeFormat="HH:mm:ss.SSS"
                                isValidDate={(currentDate) => {
                                    return currentDate.isAfter(new Date(formData.periodStart));
                                }}
                                onChange={(date) => handleDateChange(date, 'periodEnd')}
                                className=''
                            />
                        </div>
                    </div>
                </div>
                <button className='bg-black text-white font-bold text-2xl mt-10 p-5 w-[300px] rounded-md cursor-pointer hover:bg-slate-500'
                    type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "ADD PAYROLL"}
                </button>
            </form>
            {error && <p className='text-red-500 mt-4 ml-10'>{error}</p>}
        </div>
    )
}

export default GeneratePayroll