/*
  Warnings:

  - You are about to drop the `_ChatToMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChatToMessage" DROP CONSTRAINT "_ChatToMessage_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToMessage" DROP CONSTRAINT "_ChatToMessage_B_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "chatId" TEXT;

-- DropTable
DROP TABLE "_ChatToMessage";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
