/*
  Warnings:

  - The `role` column on the `Skills` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `purpose` column on the `Skills` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `skill_type` on the `Skills` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `family` on the `Skills` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Skill_Type" AS ENUM ('SOFT', 'HARD');

-- CreateEnum
CREATE TYPE "Family" AS ENUM ('GENERAL', 'PROGRAMMING', 'MULTIMEDIA', 'QUANTITATIVE');

-- AlterTable
ALTER TABLE "Skills" DROP COLUMN "skill_type",
ADD COLUMN     "skill_type" "Skill_Type" NOT NULL,
DROP COLUMN "family",
ADD COLUMN     "family" "Family" NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT[],
DROP COLUMN "purpose",
ADD COLUMN     "purpose" TEXT[];

-- DropEnum
DROP TYPE "FAMILY";

-- DropEnum
DROP TYPE "SKILL_TYPE";
