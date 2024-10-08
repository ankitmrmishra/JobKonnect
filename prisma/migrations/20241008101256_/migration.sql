-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('Fulltime', 'InternShip', 'ContractBasis');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('Google');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "sub" TEXT NOT NULL DEFAULT '',
    "username" TEXT,
    "password" TEXT,
    "profilePicture" TEXT,
    "provider" "Provider" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyImage" TEXT NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobDetail" (
    "id" TEXT NOT NULL,
    "jobPosition" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "employmentType" "EmploymentType" NOT NULL,
    "detail" TEXT,
    "timeOfPosting" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyemailId" TEXT NOT NULL,

    CONSTRAINT "JobDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "JobDetail" ADD CONSTRAINT "JobDetail_companyemailId_fkey" FOREIGN KEY ("companyemailId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
