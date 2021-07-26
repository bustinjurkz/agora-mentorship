/*
  Warnings:

  - Changed the type of `major` on the `Majors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Major" AS ENUM ('ARTS_AND_SCIENCE', 'COMPUTER_SCIENCE', 'BUSINESS_INFORMATICS', 'HUMAN_BEHAVIOUR', 'ENGINEERING', 'CHEMICAL_ENGINEERING', 'CIVIL_ENGINEERING', 'COMPUTER_ENGINEERING', 'ELECTRICAL_ENGINEERING', 'ELECTRICAL_AND_BIOMEDICAL_ENGINEERING', 'MATERIALS_ENGINEERING', 'MECHANICAL_ENGINEERING', 'MECHATRONICS_ENGINEERING', 'NANOTECHNOLOGY_ENGINEERING', 'SOFTWARE_ENGINEERING', 'AEROSPACE_ENGINEERING', 'B_TECH', 'AUTOMATION_ENGINEERING', 'AUTOMOTIVE_AND_VEHICLE_ENGINEERING_TECHNOLOGY', 'BIOTECHNOLOGY', 'CIVIL_ENGINEERING_INFRASTRUCTURE_TECHNOLOGY', 'MANUFACTURING_ENGINEERING_TECHNOLOGY', 'POWER_AND_ENERGY_ENGINEERING_TECHNOLOGY', 'SOFTWARE_ENGINEERING_AND_TECHNOLOGY', 'HEALTH_SCIENCES', 'ENGINEERING_SCIENCE_AND_ENTREPRENEURSHIP', 'BIOLOGY_AND_PHARMACOLOGY', 'MIDWIFERY_PROGRAM', 'PHYSICIAN_ASSISTANT', 'NURSING', 'ECONOMICS', 'HEALTH_AND_SOCIETY', 'HUMANITIES', 'SOCIAL_SCIENCES', 'ART_HISTORY', 'ARCHAEOLOGY', 'ANTHROPOLOGY', 'AGING_AND_SOCIETY', 'CLASSICS', 'COGNITIVE_SCIENCE', 'COMMUNICATION_STUDIES', 'ENGLISH_AND_CULTURAL_STUDIES', 'FRENCH', 'GEOGRAPHY', 'HISTORY', 'INDIGENOUS_STUDIES', 'JUSTICE_POLITICAL_PHILOSOPHY_AND_LAW', 'LABOUR_STUDIES', 'LINGUISTICS', 'MULTIMEDIA', 'PHILOSOPHY', 'POLITICAL_SCIENCE', 'SOCIETY_CULTURE_AND_RELIGION', 'SOCIAL_PSYCHOLOGY', 'SOCIOLOGY', 'THEATRE_AND_FILM', 'MUSIC', 'STUDIO_ART', 'SOCIAL_WORK', 'LAW', 'CHEMICAL_AND_PHYSICAL_SCIENCES', 'INTEGRATED_SCIENCES', 'LIFE_SCIENCES', 'MATHEMATICS_AND_STATISTICS', 'BIOSTATISTICS', 'DATA_SCIENCE', 'EARTH_AND_ENVIRONMENTAL_SCIENCES', 'ACTUARIAL_AND_FINANCIAL_MATHEMATICS', 'ASTROPHYSICS', 'BIOCHEMISTRY', 'BIOLOGY', 'CHEMICAL_BIOLOGY', 'CHEMISTRY', 'ENVIRONMENTAL_SCIENCES', 'COMPUTATIONAL_MATHEMATICS', 'NEUROSCIENCE', 'PHYSICS', 'PSYCHOLOGY_NEUROSCIENCE_AND_BEHAVIOUR', 'KINESIOLOGY', 'MEDICAL_RADIATION');

-- AlterTable
ALTER TABLE "Majors" DROP COLUMN "major",
ADD COLUMN     "major" "Major" NOT NULL;

-- CreateTable
CREATE TABLE "MajorSimularity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "namee" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);
