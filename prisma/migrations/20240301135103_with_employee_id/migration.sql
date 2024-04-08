/*
  Warnings:

  - A unique constraint covering the columns `[employeeSpecialId]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employees" ADD COLUMN     "employeeSpecialId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Employees_employeeSpecialId_key" ON "Employees"("employeeSpecialId");
