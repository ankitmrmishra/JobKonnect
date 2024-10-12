-- CreateTable
CREATE TABLE "_JobDetailTocompany" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobDetailTocompany_AB_unique" ON "_JobDetailTocompany"("A", "B");

-- CreateIndex
CREATE INDEX "_JobDetailTocompany_B_index" ON "_JobDetailTocompany"("B");

-- AddForeignKey
ALTER TABLE "_JobDetailTocompany" ADD CONSTRAINT "_JobDetailTocompany_A_fkey" FOREIGN KEY ("A") REFERENCES "JobDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobDetailTocompany" ADD CONSTRAINT "_JobDetailTocompany_B_fkey" FOREIGN KEY ("B") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
