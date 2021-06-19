/*
  Warnings:

  - The `school` column on the `Mentee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `school` column on the `Mentor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `school_year` column on the `Mentor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Mentee" ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "job_title_secondary" DROP NOT NULL,
DROP COLUMN "school",
ADD COLUMN     "school" TEXT[],
ALTER COLUMN "school_year" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Mentor" ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "job_title_secondary" DROP NOT NULL,
DROP COLUMN "school",
ADD COLUMN     "school" TEXT[],
DROP COLUMN "school_year",
ADD COLUMN     "school_year" INTEGER;
