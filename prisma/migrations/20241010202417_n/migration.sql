/*
  Warnings:

  - You are about to drop the `_JobDetailTocompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_JobDetailTocompany" DROP CONSTRAINT "_JobDetailTocompany_A_fkey";

-- DropForeignKey
ALTER TABLE "_JobDetailTocompany" DROP CONSTRAINT "_JobDetailTocompany_B_fkey";

-- DropTable
DROP TABLE "_JobDetailTocompany";
