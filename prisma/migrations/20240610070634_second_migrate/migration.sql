/*
  Warnings:

  - A unique constraint covering the columns `[projectId,studentId]` on the table `Doc` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Doc" ADD COLUMN     "projectId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Doc_projectId_studentId_key" ON "Doc"("projectId", "studentId");

-- AddForeignKey
ALTER TABLE "Doc" ADD CONSTRAINT "Doc_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
