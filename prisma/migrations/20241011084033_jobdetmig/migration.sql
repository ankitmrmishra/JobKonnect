-- DropForeignKey
ALTER TABLE "JobDetail" DROP CONSTRAINT "JobDetail_companyNameforJobPosting_fkey";

-- DropIndex
DROP INDEX "company_companyName_key";

-- AddForeignKey
ALTER TABLE "JobDetail" ADD CONSTRAINT "JobDetail_companyNameforJobPosting_fkey" FOREIGN KEY ("companyNameforJobPosting") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
