import React, { useEffect, useState } from "react";

type Employee = {
    id: string
    firstName: string
    lastName: string
    assignment: Assign_Designation[]
}

type Assign_Designation = {
    assignmentStatus: string
}

type EmployeeSelectionProps = {
    name: string
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    value?: string
}
const ActiveEmployeeSelection = ({ name, value, onChange }: EmployeeSelectionProps) => {
    const [employees, setEmployees] = useState<Employee[]>([])

    const makeApiCall = async () => {
        const response = await fetch("/api/employee", {
            method: "GET"
        })
        const data = await response.json()
        const activeEmployees = data.filter((employee: Employee) =>
            employee.assignment.some((assign: Assign_Designation) => assign.assignmentStatus === 'Active')
        )
        setEmployees(activeEmployees)
    }

    useEffect(() => {
        makeApiCall();
    }, []);

    return (
        <select
            className="w-[357px] p-2 border border-gray-200 bg-indigo-50"
            name={name}
            value={value}
            onChange={onChange}
        >
            <option value="">Select an Active Employee</option>
            {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                </option>
            ))}
        </select>
    )
}

export default ActiveEmployeeSelection