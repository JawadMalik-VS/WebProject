/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_courseId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "id" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Student"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
