import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const payroll = await prisma.payroll.findMany({
        include: {
            employee: true,
            deductions: true,
            additionalEarnings: true,
            governmentContributions: true,
        }
    });
    return NextResponse.json(payroll);
}

export async function POST(request: Request) {
    const json = await request.json();

    const created = await prisma.payroll.create({
        data: json,
    });

    return new NextResponse(JSON.stringify(created), { status: 201 });
}

export async function POSTLAHAT(request: Request) {
    const json = await request.json();

    const created = await prisma.payroll.create({
        data: json,
    });

    const govContri = await prisma.governmentContributions.create({
        data: json,
    });

    return new NextResponse(JSON.stringify({ created, govContri }), { status: 201 });
}