/*
  Warnings:

  - You are about to drop the column `companyNameforJobPosting` on the `JobDetail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyName]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `JobDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JobDetail" DROP CONSTRAINT "JobDetail_companyNameforJobPosting_fkey";

-- AlterTable
ALTER TABLE "JobDetail" DROP COLUMN "companyNameforJobPosting",
ADD COLUMN     "companyId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "company_companyName_key" ON "company"("companyName");

-- AddForeignKey
ALTER TABLE "JobDetail" ADD CONSTRAINT "JobDetail_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
