import {
  Languages,
  Majors,
  Mentee,
  Mentor,
  PrismaClient,
  Skills,
  University,
} from '@prisma/client';
import { mentors } from './sample-data/mentors';
import { mentees } from './sample-data/mentees';
import { universities } from './sample-data/universities';
import { skills } from './sample-data/skills';
import { majors } from './sample-data/majors';
import { languages } from './sample-data/languages';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

export const seed = async () => {
  await prisma.mentee.deleteMany();
  await prisma.mentor.deleteMany();
  for (const mentor of mentors) {
    const mentorAdded = await prisma.mentor.create({
      data: mentor as Mentor,
    });
    console.log(`Created mentor with ID ${mentorAdded.id}`);
  }
  for (const mentee of mentees) {
    const menteeAdded = await prisma.mentee.create({
      data: mentee as Mentee,
    });
    console.log(`Created mentee with ID ${menteeAdded.id}`);
  }
  for (const major of majors) {
    const majorAdded = await prisma.majors.create({
      data: major as Majors,
    });
    console.log(`Created major with ID ${majorAdded.id}`);
  }
  for (const language of languages) {
    const languageAdded = await prisma.languages.create({
      data: language as Languages,
    });
    console.log(`Created language with ID ${languageAdded.id}`);
  }
  for (const skill of skills) {
    const skillAdded = await prisma.skills.create({
      data: skill as Skills,
    });
    console.log(`Created skill with ID ${skillAdded.id}`);
  }
  for (const university of universities) {
    const universityAdded: University = await prisma.university.create({
      data: {
        name: university.name,
        city: university.city,
        province: university.province,
        country: university.country,
        language: university.language,
        category: university.category,
        undergrad_count: parseInt(university.undergrad_count),
        postgrad_count: parseInt(university.postgrad_count),
        total_count: parseInt(university.total_count),
        year_founded: parseInt(university.year_founded),
        size_score: parseInt(university.size_score),
      },
    });
    console.log(`Created university with ID ${universityAdded.id}`);
  }
};

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
