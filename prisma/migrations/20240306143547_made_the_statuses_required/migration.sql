/*
  Warnings:

  - Made the column `employeeType` on table `Assign_Designation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `assignmentStatus` on table `Assign_Designation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Department` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Designation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Assign_Designation" ALTER COLUMN "employeeType" SET NOT NULL,
ALTER COLUMN "assignmentStatus" SET NOT NULL;

-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "Designation" ALTER COLUMN "status" SET NOT NULL;
