/*
  Warnings:

  - The `refId` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `refId` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cid` column on the `Wallet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_refId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_refId_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_cid_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "refId",
ADD COLUMN     "refId" INTEGER;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "refId",
ADD COLUMN     "refId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "cid",
ADD COLUMN     "cid" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_refId_fkey" FOREIGN KEY ("refId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_cid_fkey" FOREIGN KEY ("cid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_refId_fkey" FOREIGN KEY ("refId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
