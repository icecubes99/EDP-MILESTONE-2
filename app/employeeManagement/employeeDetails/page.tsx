"use client";

import React, { useEffect } from "react";

import TableHeader from "@/components/shared/TableHeader";

import ShowEmployeeDetails from "@/components/shared/ShowEmployeeDetails";

const Home = () => {
  return (
    <main className="">
      <TableHeader />
      <ShowEmployeeDetails />
    </main>
  );
};

export default Home;
