-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('admin', 'client', 'coach');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Roles"[];
