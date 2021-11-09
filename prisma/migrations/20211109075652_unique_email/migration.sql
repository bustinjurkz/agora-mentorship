/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- RenameIndex
ALTER INDEX "Language.language_unique" RENAME TO "Language_language_key";

-- RenameIndex
ALTER INDEX "Majors.major_unique" RENAME TO "Majors_major_key";

-- RenameIndex
ALTER INDEX "Mentee.userId_unique" RENAME TO "Mentee_userId_key";

-- RenameIndex
ALTER INDEX "Mentor.userId_unique" RENAME TO "Mentor_userId_key";

-- RenameIndex
ALTER INDEX "Skills.skill_unique" RENAME TO "Skills_skill_key";

-- RenameIndex
ALTER INDEX "University.name_unique" RENAME TO "University_name_key";
