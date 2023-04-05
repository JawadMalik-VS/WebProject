-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_refId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "refId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_refId_fkey" FOREIGN KEY ("refId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
