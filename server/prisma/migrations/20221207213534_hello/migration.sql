/*
  Warnings:

  - The primary key for the `Meetups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Meetups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meetups" DROP CONSTRAINT "Meetups_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Meetups_pkey" PRIMARY KEY ("id");
