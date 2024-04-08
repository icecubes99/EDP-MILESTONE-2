-- DropForeignKey
ALTER TABLE "Assign_Designation" DROP CONSTRAINT "Assign_Designation_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Leaves" DROP CONSTRAINT "Leaves_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Signatories" DROP CONSTRAINT "Signatories_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Signatories" DROP CONSTRAINT "Signatories_higherSuperiorId_fkey";

-- AddForeignKey
ALTER TABLE "Assign_Designation" ADD CONSTRAINT "Assign_Designation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaves" ADD CONSTRAINT "Leaves_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signatories" ADD CONSTRAINT "Signatories_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signatories" ADD CONSTRAINT "Signatories_higherSuperiorId_fkey" FOREIGN KEY ("higherSuperiorId") REFERENCES "Employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
