/*
  Warnings:

  - You are about to drop the `UserChat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserChat" DROP CONSTRAINT "UserChat_chatId_fkey";

-- DropForeignKey
ALTER TABLE "UserChat" DROP CONSTRAINT "UserChat_userId_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "UserChat";

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
