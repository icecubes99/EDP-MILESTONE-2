import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const designation = await prisma.assign_Designation.findMany();
  return NextResponse.json(designation);
}

export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.assign_Designation.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
