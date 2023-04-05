/*
  Warnings:

  - Added the required column `refId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "refId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_refId_fkey" FOREIGN KEY ("refId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
