-- DropForeignKey
ALTER TABLE "AdditionalEarnings" DROP CONSTRAINT "AdditionalEarnings_payrollId_fkey";

-- DropForeignKey
ALTER TABLE "Deductions" DROP CONSTRAINT "Deductions_payrollId_fkey";

-- DropForeignKey
ALTER TABLE "GovernmentContributions" DROP CONSTRAINT "GovernmentContributions_payrollId_fkey";

-- AddForeignKey
ALTER TABLE "GovernmentContributions" ADD CONSTRAINT "GovernmentContributions_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalEarnings" ADD CONSTRAINT "AdditionalEarnings_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deductions" ADD CONSTRAINT "Deductions_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE CASCADE ON UPDATE CASCADE;
