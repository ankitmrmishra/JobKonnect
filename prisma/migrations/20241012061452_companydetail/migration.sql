/*
  Warnings:

  - Added the required column `companyDetail` to the `company` table without a default value. This is not possible if the table is not empty.
  - Made the column `companyName` on table `company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyImage` on table `company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "companyDetail" TEXT NOT NULL,
ALTER COLUMN "companyName" SET NOT NULL,
ALTER COLUMN "companyImage" SET NOT NULL;
