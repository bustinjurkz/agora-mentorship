/*
  Warnings:

  - Added the required column `year_founded` to the `University` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "University" ADD COLUMN     "year_founded" INTEGER NOT NULL;
