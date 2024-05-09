import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const employee = await prisma.employees.findUnique({
    where: { id },
    include: {
      assignment: {
        include: {
          designation: true,
        }
      },
      payroll: {
        include: {
          deductions: true,
          additionalEarnings: true,
          governmentContributions: true,
        }
      }
    }
  });

  // Check if employee and designation exist
  if (
    !employee //||
    // !employee.assignment ||
    // !employee.assignment[0].designation
  ) {
    return NextResponse.json({ error: "Employee or designation not found" });
  }

  return NextResponse.json({
    id: employee.id,
    employeeSpecialId: employee.employeeSpecialId,
    firstName: employee.firstName,
    middleName: employee.middleName,
    lastName: employee.lastName,
    barangay: employee.barangay,
    street: employee.street,
    city: employee.city,
    province: employee.province,
    Country: employee.Country,
    zipCode: employee.zipCode,
    emailAddress: employee.emailAddress,
    contactNumber: employee.contactNumber,
    createdAt: employee.createdAt,
    assignment: employee.assignment,
    employeeType: employee.assignment && employee.assignment[0] ? employee.assignment[0].employeeType : null,
    designationName: employee.assignment && employee.assignment[0] ? employee.assignment[0].designation.designationName : null,
    assignmentStatus: employee.assignment && employee.assignment[0] ? employee.assignment[0].assignmentStatus : null,
    assignmentId: employee.assignment && employee.assignment[0] ? employee.assignment[0].id : null,

    payroll: employee.payroll,
    additionalEarnings: employee.payroll && employee.payroll[0] ? employee.payroll[0].additionalEarnings : null,
    deductions: employee.payroll && employee.payroll[0] ? employee.payroll[0].deductions : null,
    governmentContributions: employee.payroll && employee.payroll[0] ? employee.payroll[0].governmentContributions : null,

    periodStart: employee.payroll && employee.payroll[0] ? employee.payroll[0].periodStart : null
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.employees.update({
    where: { id },
    data: json
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  // // First, delete the Assign_Designation record
  // await prisma.assign_Designation.deleteMany({
  //   where: { employeeId: id },
  // });

  // Then, delete the Employees record
  const deletedEmployee = await prisma.employees.delete({
    where: { id },
  });

  return NextResponse.json(deletedEmployee);
}
