import React, { useEffect, useState } from "react";

type Designation = {
  id: string;
  designationName: string;
};

type DesignationsSelectionProps = {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
};

const DesignationsSelection = ({ name, value, onChange }: DesignationsSelectionProps) => {
  const [designations, setDesignations] = useState<Designation[]>([]);

  const makeApiCall = async () => {
    const response = await fetch("/api/designation", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setDesignations(data);
  };

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
      <option value="">Select a designation</option>
      {designations.map((designation) => (
        <option key={designation.id} value={designation.id}>
          {designation.designationName}
        </option>
      ))}
    </select>
  );
};

export default DesignationsSelection;
