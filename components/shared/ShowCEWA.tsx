import React, { useState, useEffect } from 'react';
import CreateEmployeeWithApi from "@/components/shared/CreateEmployeeWithApi";

const ShowCEWA = () => {
    const [employee, setEmployee] = useState([]);

    const fetchEmployees = async () => {
        const response = await fetch('/api/employee');
        const data = await response.json();
        setEmployee(data);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

  return (
    <div>
        <CreateEmployeeWithApi />
    </div>
  )
}

export default ShowCEWA