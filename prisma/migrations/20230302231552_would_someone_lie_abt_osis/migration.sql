/*
  Warnings:

  - Added the required column `osis` to the `FormInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormInfo" ADD COLUMN     "osis" TEXT NOT NULL;
