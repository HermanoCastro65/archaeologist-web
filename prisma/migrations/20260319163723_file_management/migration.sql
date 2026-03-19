-- AlterTable
ALTER TABLE "RepositoryFile" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "RepositoryFile_isArchived_idx" ON "RepositoryFile"("isArchived");
