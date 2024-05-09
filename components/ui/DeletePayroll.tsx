"use client";
import React from "react";

const DeletePayroll = ({ id }: { id: string }) => {
    const makeApiCall = async () => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            const response = await fetch(`/api/payroll/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                // Handle error
                console.error("Failed to delete payroll");
                return (
                    <div>
                        <h1>Failed to delete payroll</h1>
                    </div>
                );
            }
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
            Delete
        </button>
    );
};

export default DeletePayroll