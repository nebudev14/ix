/*
  Warnings:

  - Added the required column `experience` to the `FormInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormInfo" ADD COLUMN     "experience" "Experience" NOT NULL;
