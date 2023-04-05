/*
  Warnings:

  - You are about to drop the column `clientId` on the `VideoCall` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "VideoCall" DROP CONSTRAINT "VideoCall_clientId_fkey";

-- AlterTable
ALTER TABLE "VideoCall" DROP COLUMN "clientId",
ADD COLUMN     "adminId" TEXT;

-- AddForeignKey
ALTER TABLE "VideoCall" ADD CONSTRAINT "VideoCall_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
