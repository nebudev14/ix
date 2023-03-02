/*
  Warnings:

  - Added the required column `hasTeam` to the `FormInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormInfo" ADD COLUMN     "hasTeam" BOOLEAN NOT NULL,
ADD COLUMN     "shouldMatchTeam" BOOLEAN,
ALTER COLUMN "teamMembers" SET DEFAULT ARRAY[]::TEXT[];
