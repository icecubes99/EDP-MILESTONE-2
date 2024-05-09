import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const payroll = await prisma.governmentContributions.findMany();
    return NextResponse.json(payroll);
}

export async function POST(request: Request) {
    const json = await request.json();

    const created = await prisma.governmentContributions.create({
        data: json,
    });

    return new NextResponse(JSON.stringify(created), { status: 201 });
}
