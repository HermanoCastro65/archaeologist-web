/*
  Warnings:

  - A unique constraint covering the columns `[url,userId]` on the table `Repository` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Repository` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Repository" DROP CONSTRAINT "Repository_userId_fkey";

-- DropIndex
DROP INDEX "Repository_url_key";

-- AlterTable
ALTER TABLE "Repository" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Repository_url_userId_key" ON "Repository"("url", "userId");

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
