/*
  Warnings:

  - You are about to drop the column `approvalStatus` on the `Signatories` table. All the data in the column will be lost.
  - You are about to drop the column `approvedById` on the `Signatories` table. All the data in the column will be lost.
  - You are about to drop the column `leaveId` on the `Signatories` table. All the data in the column will be lost.
  - Added the required column `higherSuperiorId` to the `Signatories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Signatories" DROP CONSTRAINT "Signatories_approvedById_fkey";

-- DropForeignKey
ALTER TABLE "Signatories" DROP CONSTRAINT "Signatories_leaveId_fkey";

-- AlterTable
ALTER TABLE "Leaves" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "Signatories" DROP COLUMN "approvalStatus",
DROP COLUMN "approvedById",
DROP COLUMN "leaveId",
ADD COLUMN     "higherSuperiorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Signatories" ADD CONSTRAINT "Signatories_higherSuperiorId_fkey" FOREIGN KEY ("higherSuperiorId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
