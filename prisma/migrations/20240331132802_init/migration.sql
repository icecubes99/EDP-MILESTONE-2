/*
  Warnings:

  - Added the required column `employeeId` to the `Signatories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Signatories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Signatories" DROP CONSTRAINT "Signatories_higherSuperiorId_fkey";

-- AlterTable
ALTER TABLE "Signatories" ADD COLUMN     "employeeId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Signatories" ADD CONSTRAINT "Signatories_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signatories" ADD CONSTRAINT "Signatories_higherSuperiorId_fkey" FOREIGN KEY ("higherSuperiorId") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
