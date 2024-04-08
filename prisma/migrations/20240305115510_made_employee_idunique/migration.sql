/*
  Warnings:

  - A unique constraint covering the columns `[employeeId]` on the table `Assign_Designation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Assign_Designation_employeeId_key" ON "Assign_Designation"("employeeId");
