-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "submitted" BOOLEAN NOT NULL DEFAULT false;
