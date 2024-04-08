/*
  Warnings:

  - The primary key for the `Employees` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "Assignment_Status" AS ENUM ('Active', 'Resigned', 'AWOL');

-- CreateEnum
CREATE TYPE "Employee_Type" AS ENUM ('Regular', 'Contractual', 'Part_Time', 'Remote', 'Intern', 'Freelance');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Inactive');

-- AlterTable
ALTER TABLE "Employees" DROP CONSTRAINT "Employees_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Employees_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Employees_id_seq";

-- CreateTable
CREATE TABLE "Assign_Designation" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "employeeType" "Employee_Type" NOT NULL,
    "assignmentStatus" "Assignment_Status" NOT NULL,
    "designationId" TEXT NOT NULL,

    CONSTRAINT "Assign_Designation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Designation" (
    "id" TEXT NOT NULL,
    "designationName" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "departmentId" TEXT NOT NULL,

    CONSTRAINT "Designation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "departmentName" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assign_Designation" ADD CONSTRAINT "Assign_Designation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assign_Designation" ADD CONSTRAINT "Assign_Designation_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
