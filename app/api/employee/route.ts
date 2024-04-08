import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const employees = await prisma.employees.findMany({
    include: {
      assignment: {
        include: {
          designation: true,
        },
      },
    },
  });
  console.log(employees);
  return NextResponse.json(employees);
}
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.employees.create({
    data: json,
  });

  console.log(created);
  return new NextResponse(JSON.stringify(created), { status: 201 });
}
