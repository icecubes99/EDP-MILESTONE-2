"use client";
import React from "react";

const DeleteEmployee = ({ id }: { id: string }) => {
  const makeApiCall = async () => {
    const response = await fetch(`/api/employee/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      // Handle error
      console.error("Failed to delete employee");
      return (
        <div>
          <h1>Failed to delete employee</h1>
        </div>
      );
    }

    // Handle success
    console.log("Employee deleted successfully");

    // Refresh the page
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <button className="text-blue-500 hover:text-red-600 " onClick={makeApiCall}>
      Delete Record
    </button>
  );
};

export default DeleteEmployee;
