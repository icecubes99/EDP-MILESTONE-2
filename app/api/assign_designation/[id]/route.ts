import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const designation = await prisma.assign_Designation.findUnique({
    where: { id },
  });
  return NextResponse.json(designation);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.assign_Designation.update({
    where: { id },
    data: json
  });
  return NextResponse.json(updated);
}