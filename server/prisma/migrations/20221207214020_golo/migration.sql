/*
  Warnings:

  - The primary key for the `Meetups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Meetups` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Meetups" DROP CONSTRAINT "Meetups_pkey",
ADD CONSTRAINT "Meetups_pkey" PRIMARY KEY ("title");

-- CreateIndex
CREATE UNIQUE INDEX "Meetups_id_key" ON "Meetups"("id");
