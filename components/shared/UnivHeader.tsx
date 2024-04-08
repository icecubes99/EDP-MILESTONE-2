import Link from "next/link";
import React from "react";

const UnivHeader = () => {
  return (
    <div className="flex w-screen h-1/5 justify-between border-b-4">
      <div className="p-6 pl-10 text-xl font-bold w-[20%] bg-indigo-50">
        <Link href="/">KUPLER INDUSTRIES</Link>
      </div>
      <Link href="/administrator">
        <div className="p-6 text-lg font-semibold hover:text-purple-600">ADMINISTRATOR</div> </Link>
    </div>
  );
};

export default UnivHeader;
