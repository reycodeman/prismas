/*
  Warnings:

  - You are about to drop the column `enrollment` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gradeLevel` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `hireDate` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[registrationNumber]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registrationNumber` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT');

-- DropIndex
DROP INDEX "public"."Student_enrollment_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "enrollment",
DROP COLUMN "gradeLevel",
ADD COLUMN     "registrationNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "hireDate",
ADD COLUMN     "bio" TEXT,
ALTER COLUMN "subject" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreshToken",
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT';

-- DropEnum
DROP TYPE "public"."UserRole";

-- CreateIndex
CREATE UNIQUE INDEX "Student_registrationNumber_key" ON "Student"("registrationNumber");
