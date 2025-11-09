-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MANAGER';

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "course" TEXT;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "hireDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT;
