/*
  Warnings:

  - A unique constraint covering the columns `[repositoryId,path]` on the table `RepositoryFile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scanId` to the `RepositoryFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RepositoryFile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hash" TEXT,
ADD COLUMN     "scanId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "RepositoryFile_repositoryId_idx" ON "RepositoryFile"("repositoryId");

-- CreateIndex
CREATE INDEX "RepositoryFile_scanId_idx" ON "RepositoryFile"("scanId");

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryFile_repositoryId_path_key" ON "RepositoryFile"("repositoryId", "path");

-- CreateIndex
CREATE INDEX "RepositoryScan_repositoryId_idx" ON "RepositoryScan"("repositoryId");

-- AddForeignKey
ALTER TABLE "RepositoryFile" ADD CONSTRAINT "RepositoryFile_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "RepositoryScan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
