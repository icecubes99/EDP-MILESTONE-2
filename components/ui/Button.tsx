"use client";
import React from "react";
import { ReactNode } from "react";

interface buttonProps {
  type?: "button" | "submit" | "reset";
  text: string | ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ type, text, onClick, className }: buttonProps) => {
  return (
    <>
      {" "}
      <button onClick={onClick} type={type} className={className}>
        {text}
      </button>
    </>
  );
};

export default Button;
