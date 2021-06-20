-- CreateEnum
CREATE TYPE "Services" AS ENUM ('CAREER_DEVELOPMENT', 'GENERAL', 'MOCK_INTERVIEW', 'CAREER_PLANNING', 'SUCCESS_AT_WORK');

-- CreateTable
CREATE TABLE "Mentor" (
    "id" SERIAL NOT NULL,
    "bio" TEXT NOT NULL,
    "job_title_primary" TEXT NOT NULL,
    "job_title_secondary" TEXT NOT NULL,
    "preferred_services" "Services"[],
    "school" TEXT NOT NULL,
    "school_major" TEXT NOT NULL,
    "school_year" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentee" (
    "id" SERIAL NOT NULL,
    "bio" TEXT NOT NULL,
    "job_title_primary" TEXT NOT NULL,
    "job_title_secondary" TEXT NOT NULL,
    "preferred_services" "Services"[],
    "school" TEXT NOT NULL,
    "school_major" TEXT NOT NULL,
    "school_year" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
