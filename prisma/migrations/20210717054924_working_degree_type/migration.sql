/*
  Warnings:

  - Added the required column `degree_type` to the `Mentee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `degree_type` to the `Mentor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mentee" ADD COLUMN     "degree_type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Mentor" ADD COLUMN     "degree_type" TEXT NOT NULL;
