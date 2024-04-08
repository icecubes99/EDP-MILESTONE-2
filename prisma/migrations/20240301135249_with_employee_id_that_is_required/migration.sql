/*
  Warnings:

  - Made the column `employeeSpecialId` on table `Employees` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employees" ALTER COLUMN "employeeSpecialId" SET NOT NULL;
