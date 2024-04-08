-- CreateTable
CREATE TABLE "Leaves" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "leaveType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leaves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signatories" (
    "id" TEXT NOT NULL,
    "approvalStatus" TEXT NOT NULL,
    "approvedById" TEXT NOT NULL,
    "leaveId" TEXT NOT NULL,

    CONSTRAINT "Signatories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Leaves" ADD CONSTRAINT "Leaves_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signatories" ADD CONSTRAINT "Signatories_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signatories" ADD CONSTRAINT "Signatories_leaveId_fkey" FOREIGN KEY ("leaveId") REFERENCES "Leaves"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
