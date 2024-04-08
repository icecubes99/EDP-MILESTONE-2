"use client";

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'
import DesignationsSelection from '@/components/ui/DesignationsSelection';
import Sidebar from "@/components/shared/Sidebar";
import UnivHeader from "@/components/shared/UnivHeader";
import Link from "next/link";

export default function page({ params }: { params: { id: string } }) {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        emailAddress: '',
        contactNumber: '',
        employeeSpecialId: '',
        street: '',
        barangay: '',
        city: '',
        province: '',
        Country: '',
        zipCode: '',

        employeeType: '',
        assignmentStatus: '',
        designationId: '',

        assignmentId: ''
    })
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/employee/${params.id}`)

                if (!response.ok) {
                    throw new Error("Failed to Load Data")
                }

                const data = await response.json();
                setFormData({ firstName: data.firstName, middleName: data.middleName, lastName: data.lastName, emailAddress: data.emailAddress, contactNumber: data.contactNumber, employeeSpecialId: data.employeeSpecialId, street: data.street, barangay: data.barangay, city: data.city, province: data.province, Country: data.Country, zipCode: data.zipCode, employeeType: data.employeeType, assignmentStatus: data.assignmentStatus, designationId: data.designationName, assignmentId: data.assignmentId })

            } catch (error) {
                setError("Failed to Load Data");
            }
        }

        fetchData();
    }, [])
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.firstName || !formData.lastName || !formData.emailAddress || !formData.contactNumber || !formData.employeeSpecialId || !formData.street || !formData.barangay || !formData.city || !formData.province || !formData.Country || !formData.zipCode) {
            setError("Please fill in all fields");
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`/api/employee/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // ...formData,
                    zipCode: Number(formData.zipCode),
                    firstName: formData.firstName,
                    middleName: formData.middleName,
                    lastName: formData.lastName,
                    emailAddress: formData.emailAddress,
                    contactNumber: formData.contactNumber,
                    employeeSpecialId: formData.employeeSpecialId,
                    street: formData.street,
                    barangay: formData.barangay,
                    city: formData.city,
                    province: formData.province,
                    Country: formData.Country,

                })
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            } else {
                const employee = await response.json();
                const assignmentResponse = await fetch(`/api/assign_designation/${formData.assignmentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        employeeId: employee.id,
                        employeeType: formData.employeeType,
                        assignmentStatus: formData.assignmentStatus,
                        designationId: formData.designationId
                    })
                });

                if (!assignmentResponse.ok) {
                    throw new Error('Failed to update designation');
                }
                router.push('/employeeManagement')
            }
        } catch (error) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div>
            <UnivHeader />
            <div className='flex flex-row'>
                <Sidebar />
                <div>
                    <h1 className="text-2xl font-bold ml-10 mt-10">EDIT EMPLOYEE : {formData.lastName}, {formData.firstName}</h1>
                    <form className="flex flex-col" onSubmit={handleSubmit} >
                        <div className="flex gap-x-24 ml-10 mt-10">
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>FIRST NAME</h1>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    placeholder='First Name'
                                    onChange={handleInputChange}
                                    className='w-[357px]  p-2 border border-gray-200 bg-indigo-50 '
                                />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>MIDDLE NAME</h1>
                                <input
                                    type="text"
                                    name="middleName"
                                    value={formData.middleName}
                                    placeholder='Middle Name'
                                    onChange={handleInputChange}
                                    className='w-[357px]  p-2 border border-gray-200 bg-indigo-50 '
                                />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>LAST NAME</h1>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    placeholder='Last Name'
                                    onChange={handleInputChange}
                                    className='w-[357px]  p-2 border border-gray-200 bg-indigo-50 '
                                />
                            </div>
                        </div>
                        <div className="flex gap-x-24 ml-10 mt-10">
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>EMPLOYEE ID</h1>
                                <input
                                    type="text"
                                    name="employeeSpecialId"
                                    value={formData.employeeSpecialId}
                                    placeholder='Employee ID'
                                    onChange={handleInputChange}
                                    className='w-[357px]  p-2 border border-gray-200 bg-indigo-50 '
                                />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>BARANGAY</h1>
                                <input
                                    type="text"
                                    name="barangay"
                                    value={formData.barangay}
                                    placeholder='Barangay'
                                    onChange={handleInputChange}
                                    className='w-[357px]  p-2 border border-gray-200 bg-indigo-50 '
                                />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>STREET</h1>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    placeholder='Street'
                                    onChange={handleInputChange}
                                    className='w-[357px]  p-2 border border-gray-200 bg-indigo-50 '
                                />
                            </div>
                        </div>
                        <div className="flex gap-x-24 ml-10 mt-10">
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>CITY</h1>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    placeholder='City'
                                    onChange={handleInputChange}
                                    className='w-[357px]  p-2 border border-gray-200 bg-indigo-50 '
                                />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>PROVINCE</h1>
                                <input
                                    type="text"
                                    name="province"
                                    value={formData.province}
                                    placeholder='Province'
                                    onChange={handleInputChange}
                                    className='w-[357px]  p-2 border border-gray-200 bg-indigo-50 '
                                />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>COUNTRY</h1>
                                <input
                                    type="text"
                                    name="Country"
                                    value={formData.Country}
                                    placeholder='Country'
                                    onChange={handleInputChange}
                                    className='w-[357px]  p-2 border border-gray-200 bg-indigo-50 '
                                />
                            </div>
                        </div>
                        <div className="flex gap-x-24 ml-10 mt-10">
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>ZIP CODE</h1>
                                <input
                                    type="number"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    placeholder='Zip Code'
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
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>EMAIL ADDRESS</h1>
                                <input
                                    type="text"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    placeholder='Email Address'
                                    onChange={handleInputChange}
                                    className='w-[357px]  p-2 border border-gray-200 bg-indigo-50 '
                                />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>CONTACT NUMBER</h1>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    placeholder='Contact Number'
                                    onChange={handleInputChange}
                                    className=' p-2 border w-[357px]  border-gray-200 bg-indigo-50 '
                                />
                            </div>
                        </div>
                        <div className="flex gap-x-24 ml-10 mt-10">
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>EMPLOYEE TYPE</h1>
                                <select
                                    className="w-[357px]   p-2 border border-gray-200 bg-indigo-50"
                                    name="employeeType"
                                    onChange={handleInputChange}
                                    value={formData.employeeType}
                                >
                                    <option value="" className=" text-gray-500 ">Select an employee type</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value='Part Time'>Part Time</option>
                                    <option value="Intern">Intern</option>
                                    <option value="Contractual">Contractual</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>ASSIGNMENT STATUS</h1>
                                <select
                                    className="w-[357px]  p-2 border border-gray-200 bg-indigo-50"
                                    name="assignmentStatus"
                                    onChange={handleInputChange}
                                    value={formData.assignmentStatus}
                                >
                                    <option value="">Select an assignment status</option>
                                    <option value="Active">Active</option>
                                    <option value="Resigned">Resigned</option>
                                    <option value="AWOL">AWOL</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <h1 className='font-bold text-lg'>DESIGNATION  - Previous :  {formData.designationId}</h1>

                                <DesignationsSelection name="designationId" onChange={handleInputChange} />
                            </div>
                        </div>
                        <button className='bg-black ml-10 text-white font-bold text-2xl mt-10 p-5 w-[300px] rounded-md cursor-pointer hover:bg-slate-500'
                            type="submit" disabled={isLoading}>
                            {isLoading ? "Adding..." : "UPDATE EMPLOYEE"}
                        </button>
                    </form>
                    {error && <p className='text-red-500 mt-4 ml-10'>{error}</p>}
                </div>
            </div>
        </div>
    )
}

