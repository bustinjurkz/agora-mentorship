import { Mentee, Mentor, PrismaClient } from '@prisma/client';
import { mentors, mentees } from './data';

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
};

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
