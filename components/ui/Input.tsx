import React, { ChangeEvent } from "react";

interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  name,
  type,
  placeholder,
  value,
  className = "",
}: InputProps) => {
  return (
    <>
      <input
        className={`w-full p-2 border border-gray-200 bg-indigo-50 ${className}`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </>
  );
};

export default Input;
