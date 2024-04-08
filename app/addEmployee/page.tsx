"use client"
import React from "react";
import CreateEmployee from "@/components/shared/CreateEmployee";
import Sidebar from "@/components/shared/Sidebar";
import UnivHeader from "@/components/shared/UnivHeader";
import ShowCEWA from "@/components/shared/ShowCEWA";

const page = () => {
  return (
    <main>
      <UnivHeader />
      <div className="flex flex-row">
        <Sidebar />
        <div>
          <ShowCEWA />
          {/* <CreateEmployee /> */}
        </div>
      </div>
    </main>
  );
};

export default page;
