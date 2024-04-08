/*
  Warnings:

  - The `employeeType` column on the `Assign_Designation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `assignmentStatus` column on the `Assign_Designation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Department` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Designation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Assign_Designation" DROP COLUMN "employeeType",
ADD COLUMN     "employeeType" TEXT,
DROP COLUMN "assignmentStatus",
ADD COLUMN     "assignmentStatus" TEXT;

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "status",
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "Designation" DROP COLUMN "status",
ADD COLUMN     "status" TEXT;

-- DropEnum
DROP TYPE "Assignment_Status";

-- DropEnum
DROP TYPE "Employee_Type";

-- DropEnum
DROP TYPE "Status";
