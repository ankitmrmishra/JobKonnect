/*
  Warnings:

  - A unique constraint covering the columns `[companyName]` on the table `company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "JobDetail" ADD COLUMN     "companyNameforJobPosting" TEXT;

-- AlterTable
ALTER TABLE "company" ALTER COLUMN "companyName" DROP NOT NULL,
ALTER COLUMN "companyImage" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "company_companyName_key" ON "company"("companyName");

-- AddForeignKey
ALTER TABLE "JobDetail" ADD CONSTRAINT "JobDetail_companyNameforJobPosting_fkey" FOREIGN KEY ("companyNameforJobPosting") REFERENCES "company"("companyName") ON DELETE SET NULL ON UPDATE CASCADE;
