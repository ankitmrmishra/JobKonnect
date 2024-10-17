-- DropIndex
DROP INDEX "JobDetail_companyId_key";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "location" TEXT,
    "latestOrganization" TEXT,
    "YearOfExperience" TEXT,
    "AboutMe" TEXT,
    "Skill" TEXT,
    "Education" TEXT,
    "Achievements" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "resumeLink" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "JobdetailId" TEXT NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_JobdetailId_fkey" FOREIGN KEY ("JobdetailId") REFERENCES "JobDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
