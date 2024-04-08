import React from "react";
import SidebarIcon from "../ui/SidebarIcon";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen w-[336px] p-6 pl-10 bg-indigo-50 ">
      <div className="pb-2 pt-10 pl-2 text-xs font-normal">
        <h2>MENU</h2>
      </div>

      <Link href="/employeeManagement">
        <div className="flex gap-x-3 pt-8 pb-8 pl-2 text-sm  font-bold font hover:bg-violet-200 hover:rounded-sm">
          <SidebarIcon />
          <h1>EMPLOYEE MANAGEMENT</h1>
        </div>
      </Link>

      <Link href="/addEmployee">
        <div className="flex gap-x-3 pt-8 pb-8 pl-2 text-sm  font-bold font hover:bg-violet-200 hover:rounded-sm">
          <img src="./add.svg" alt="" />
          <h1>ADD NEW EMPLOYEES</h1>
        </div>
      </Link>

      <Link href="/employeeManagement/leaveTracker">
        <div className="flex gap-x-3 pt-8 pb-8 pl-2 text-sm  font-bold font hover:bg-violet-200 hover:rounded-sm">
          <SidebarIcon />
          <h1>LEAVES TRACKER</h1>
        </div>
      </Link>
      {/* 
      <Link href="/editDesignation">
        <div className="flex gap-x-3 pt-8 pb-8 pl-2 text-sm  font-bold font hover:bg-violet-200 hover:rounded-sm">
          <SidebarIcon />
          <h1>EDIT DESIGNATIONS</h1>
        </div>
      </Link>

      <Link href="/editDepartment">
        <div className="flex gap-x-3 pt-8 pb-8 pl-2 text-sm  font-bold font hover:bg-violet-200 hover:rounded-sm">
          <SidebarIcon />
          <h1>EDIT DEPARTMENTS</h1>
        </div>
      </Link> */}
    </div>
  );
};

export default Sidebar;
