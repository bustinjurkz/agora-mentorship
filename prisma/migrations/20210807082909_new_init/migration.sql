/*
  Warnings:

  - You are about to drop the `UserLanguage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMajor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserUniversity` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[skill]` on the table `Skills` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `University` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserLanguage" DROP CONSTRAINT "UserLanguage_languageId_fkey";

-- DropForeignKey
ALTER TABLE "UserLanguage" DROP CONSTRAINT "UserLanguage_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserMajor" DROP CONSTRAINT "UserMajor_majorId_fkey";

-- DropForeignKey
ALTER TABLE "UserMajor" DROP CONSTRAINT "UserMajor_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkills" DROP CONSTRAINT "UserSkills_skillId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkills" DROP CONSTRAINT "UserSkills_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserUniversity" DROP CONSTRAINT "UserUniversity_universityId_fkey";

-- DropForeignKey
ALTER TABLE "UserUniversity" DROP CONSTRAINT "UserUniversity_userId_fkey";

-- DropTable
DROP TABLE "UserLanguage";

-- DropTable
DROP TABLE "UserMajor";

-- DropTable
DROP TABLE "UserSkills";

-- DropTable
DROP TABLE "UserUniversity";

-- CreateTable
CREATE TABLE "_LanguageToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MajorsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SkillsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UniversityToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LanguageToUser_AB_unique" ON "_LanguageToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LanguageToUser_B_index" ON "_LanguageToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MajorsToUser_AB_unique" ON "_MajorsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MajorsToUser_B_index" ON "_MajorsToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SkillsToUser_AB_unique" ON "_SkillsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SkillsToUser_B_index" ON "_SkillsToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UniversityToUser_AB_unique" ON "_UniversityToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_UniversityToUser_B_index" ON "_UniversityToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Skills.skill_unique" ON "Skills"("skill");

-- CreateIndex
CREATE UNIQUE INDEX "University.name_unique" ON "University"("name");

-- AddForeignKey
ALTER TABLE "_LanguageToUser" ADD FOREIGN KEY ("A") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MajorsToUser" ADD FOREIGN KEY ("A") REFERENCES "Majors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MajorsToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillsToUser" ADD FOREIGN KEY ("A") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillsToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UniversityToUser" ADD FOREIGN KEY ("A") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UniversityToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
