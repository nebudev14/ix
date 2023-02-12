-- CreateEnum
CREATE TYPE "Track" AS ENUM ('GENERAL', 'BEGINNER', 'SPONSOR_PENDING');

-- CreateEnum
CREATE TYPE "Experience" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COMPETITOR', 'ADMIN');

-- CreateTable
CREATE TABLE "ExamplePerson" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'COMPETITOR',

    CONSTRAINT "ExamplePerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamplePost" (
    "id" TEXT NOT NULL,
    "posterId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "ExamplePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "osis" TEXT NOT NULL,
    "submissionId" TEXT,
    "role" "Role" NOT NULL DEFAULT 'COMPETITOR',
    "experience" "Experience" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "media" TEXT[],
    "tracks" "Track"[] DEFAULT ARRAY['GENERAL']::"Track"[],

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExamplePost" ADD CONSTRAINT "ExamplePost_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "ExamplePerson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
