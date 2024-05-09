import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;

    const payroll = await prisma.payroll.findUnique({
        where: { id },
        include: {
            employee: true,
            deductions: true,
            additionalEarnings: true,
            governmentContributions: true,
        }
    });

    return NextResponse.json(payroll);
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const json = await request.json();

    const updated = await prisma.payroll.update({
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

    const deletedEmployee = await prisma.payroll.delete({
        where: { id },
    });

    return NextResponse.json(deletedEmployee);
}
