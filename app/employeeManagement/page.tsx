import Sidebar from "@/components/shared/Sidebar";
import UnivHeader from "@/components/shared/UnivHeader";
import React from "react";
import ShowEmployeeDetailsMini from "@/components/shared/ShowEmployeeDetailsMini";
import Link from "next/link";

const Home = () => {
  return (
    <main className="">
      <UnivHeader />
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col pt-2 pl-1 text-center">
          <h1 className="pt-10 text-3xl font-bold">EMPLOYEE MANAGEMENT</h1>
          <Link href="/employeeManagement/employeeDetails">
            <h1 className="mb-16 pt-5 text-blue-700 hover:text-violet-600 text-xl">
              View Employee Details Table
            </h1>
          </Link>
          <ShowEmployeeDetailsMini />
        </div>
      </div>
    </main>
  );
};

export default Home;
