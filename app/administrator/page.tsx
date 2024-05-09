import Sidebar from "@/components/shared/Sidebar";
import UnivHeader from "@/components/shared/UnivHeader";
import React from "react";
import Link from "next/link";
import AssignSuperior from "@/components/shared/AssignSuperior";
import SuperiorsMap from "@/components/shared/SuperiorsMap";

const page = () => {
    return (
        <main>
            <UnivHeader />
            <div className="flex flex-row w-full">
                <Sidebar />
                <div className="flex flex-col pt-2 pl-1 w-[80%]">
                    <h1 className="mt-10 text-3xl font-bold text-center">ADMINISTRATOR WINDOW</h1>
                    <div className="flex flex-row">
                        <Link href="/administrator/generatePayroll">
                            <h1 className="ml-10 pt-5 text-blue-700 hover:text-violet-600 text-center text-xl">
                                Generate Payroll
                            </h1>
                        </Link>
                        <h1 className="ml-5 pt-5 text-center text-xl">
                            |
                        </h1>
                        <Link href="/administrator/viewPayrollTable">
                            <h1 className="ml-5 pt-5 text-blue-700 hover:text-violet-600 text-center text-xl">
                                View Payroll Table
                            </h1>
                        </Link>
                        <h1 className="ml-5 pt-5 text-center text-xl">
                            |
                        </h1>
                        <Link href="/administrator/viewPayrollReports">
                            <h1 className="ml-5 pt-5 text-blue-700 hover:text-violet-600 text-center text-xl">
                                View Monthy Payroll Reports
                            </h1>
                        </Link>
                    </div>

                    <div className="flex flex-col ml-10 ">
                        <h1 className="pt-10 text-3xl font-bold">ASSIGN SUPERIORS PER EMPLOYEE</h1>
                        <AssignSuperior />
                        <SuperiorsMap />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page