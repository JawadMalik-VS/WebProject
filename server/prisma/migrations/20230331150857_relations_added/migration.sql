/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_refId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_refId_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_cid_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "refId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "refId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "coachId" TEXT,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "cid" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "VideoCall" (
    "id" TEXT NOT NULL,
    "date" TEXT,
    "title" TEXT,
    "startTime" TEXT,
    "roomId" TEXT,
    "roomSid" TEXT,
    "url" TEXT,
    "endDate" TEXT,
    "callType" TEXT DEFAULT 'call',
    "clientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoCall_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_refId_fkey" FOREIGN KEY ("refId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoCall" ADD CONSTRAINT "VideoCall_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_cid_fkey" FOREIGN KEY ("cid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_refId_fkey" FOREIGN KEY ("refId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
