-- DropForeignKey
ALTER TABLE "JobDetail" DROP CONSTRAINT "JobDetail_companyId_fkey";

-- AddForeignKey
ALTER TABLE "JobDetail" ADD CONSTRAINT "JobDetail_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("companyName") ON DELETE RESTRICT ON UPDATE CASCADE;
