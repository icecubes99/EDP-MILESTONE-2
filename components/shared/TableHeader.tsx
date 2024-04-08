import Link from "next/link";
import React from "react";

const TableHeader = () => {
  return (
    <div className="flex w-[131vw] h-1/5 justify-between border-b-4">
      <div className="p-6 pl-10 text-xl font-bold w-[20%] bg-indigo-50">
        <Link href="/">KUPLER INDUSTRIES</Link>
      </div>
      <div className="p-6 text-lg font-semibold">ADMINISTRATOR</div>
    </div>
  );
};

export default TableHeader;
