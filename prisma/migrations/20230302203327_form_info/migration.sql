-- AlterEnum
ALTER TYPE "Experience" ADD VALUE 'NONE';

-- CreateTable
CREATE TABLE "FormInfo" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "discordHandle" TEXT NOT NULL,
    "teamMembers" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "FormInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormInfo_discordHandle_key" ON "FormInfo"("discordHandle");

-- CreateIndex
CREATE UNIQUE INDEX "FormInfo_userId_key" ON "FormInfo"("userId");

-- AddForeignKey
ALTER TABLE "FormInfo" ADD CONSTRAINT "FormInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
