/*
  Warnings:

  - Added the required column `reason` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "reason" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserTestType" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "testType" TEXT NOT NULL,

    CONSTRAINT "UserTestType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTestType" ADD CONSTRAINT "UserTestType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
