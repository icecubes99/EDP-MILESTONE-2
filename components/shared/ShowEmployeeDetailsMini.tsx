"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import DeleteEmployee from "../ui/DeleteEmployee";
import Link from "next/link";

interface EmployeeData {
  id: string;
  employeeSpecialId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  barangay: string;
  street: string;
  city: string;
  province: string;
  Country: string;
  zipCode: number;
  emailAddress: string;
  contactNumber: string;
  createdAt: Date;
  assignment: assignment[];
  designationName: string;
  employeeType: string;
  assignmentStatus: string;
}

interface assignment {
  id: string;
  employeeId: string;
  employeeType: string;
  assignmentStatus: string;
  designationId: string;
  designation: Designation;
}

interface Designation {
  id: string;
  designationName: string;
  assignDesignationId: string;
  designationId: string;
}
const ShowEmployeeDetails = () => {
  const [data, setData] = useState<EmployeeData[]>([]);

  const makeApiCall = async () => {
    const response = await fetch("/api/employee", {
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
    <main className="">
      <div className="flex flex-col">
        <div>
          <h1 className="pt-10 text-3xl font-bold mb-10 ml-10">
            EMPLOYEE DETAILS TABLE
          </h1>
          <table className="border-stone-500 w-full border ">
            <thead>
              <tr className="text-black font-semibold text-lg ">
                <th className="border  bg-indigo-50">FIRST NAME</th>
                <th className="border  bg-indigo-50">LAST NAME</th>
                <th className="border  bg-indigo-50">DESIGNATION</th>
                <th className="border  bg-indigo-50">
                  EMPLOYEE TYPE
                </th>
                <th className="border  bg-indigo-50">STATUS</th>
                <th className="border  bg-indigo-50">EDIT</th>
                <th className="border  bg-indigo-50">PAYSLIP</th>
                <th className="border  bg-indigo-50">LEAVE</th>
                <th className="border px-5 py-2 bg-indigo-50">DELETE</th>

              </tr>
            </thead>
            <tbody>
              {data.map((employee, id) => (
                <tr key={id}>
                  <td className="border px-7 py-2 text-center">
                    {employee.lastName}
                  </td>
                  <td className="border px-7 py-2 text-center">
                    {employee.firstName}
                  </td>
                  <td className="border px-7 py-2 text-center">
                    {employee.assignment[0]?.designation?.designationName}
                  </td>
                  <td className="border px-7 py-2 text-center">
                    {employee.assignment[0]?.assignmentStatus}
                  </td>
                  <td className="border px-7 py-2 text-center">
                    {employee.assignment[0]?.employeeType}
                  </td>
                  <td className="border px-7 py-2 items-center ">
                    <div className="text-blue-500 hover:text-violet-600 ">
                      <Link href={`/editEmployee/${employee.id}`}>Edit</Link>
                    </div>
                  </td>
                  <td className="border px-7 py-2 items-center ">
                    <div className="text-blue-500 hover:text-violet-600 ">
                      <Link href={`/employeeManagement/payslip/${employee.id}`}>View Payslip</Link>
                    </div>
                  </td>
                  <td className="border px-7 py-2 items-center ">
                    <div className="text-blue-500 hover:text-violet-600 ">
                      <Link href={`/employeeManagement/addLeave/${employee.id}`}>Add Leave</Link>
                    </div>
                  </td>
                  <td className="border px-7 py-2 flex justify-center items-center">
                    <DeleteEmployee id={employee.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default ShowEmployeeDetails;
