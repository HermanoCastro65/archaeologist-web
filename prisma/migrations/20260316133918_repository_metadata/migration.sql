/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Repository` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Repository_url_key" ON "Repository"("url");
