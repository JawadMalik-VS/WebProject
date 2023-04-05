/*
  Warnings:

  - You are about to drop the column `CNIC` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "CNIC",
DROP COLUMN "city",
DROP COLUMN "img";
