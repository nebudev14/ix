/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "media" SET DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Submission_title_key" ON "Submission"("title");
