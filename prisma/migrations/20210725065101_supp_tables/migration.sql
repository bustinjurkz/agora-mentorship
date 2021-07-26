-- CreateEnum
CREATE TYPE "SKILL_TYPE" AS ENUM ('SOFT', 'HARD');

-- CreateEnum
CREATE TYPE "FAMILY" AS ENUM ('GENERAL', 'PROGRAMMING', 'MULTIMEDIA', 'QUANTITATIVE');

-- CreateTable
CREATE TABLE "University" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT[],
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "undergrad_count" INTEGER NOT NULL,
    "postgrad_count" INTEGER NOT NULL,
    "total_count" INTEGER NOT NULL,
    "size_score" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" SERIAL NOT NULL,
    "skill" TEXT NOT NULL,
    "skill_type" "SKILL_TYPE" NOT NULL,
    "family" "FAMILY" NOT NULL,
    "role" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Languages" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "continent" TEXT NOT NULL,
    "population" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Majors" (
    "id" SERIAL NOT NULL,
    "major" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
