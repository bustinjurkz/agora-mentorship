import { PrismaClient, Services } from '@prisma/client';
import { mentors } from './mentors';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

export const seed = async () => {
  mentors.map(async (x) => {
    prisma.mentor.create({
      data: {
        name: x.name,
        bio: x.bio,
        job_title_primary: x.job_title_primary,
        job_title_secondary: x.job_title_secondary,
        preferred_services: x.preferred_services as Services,
        school: x.school,
        school_major: x.school_major,
        school_year: x.school_year,
      },
    });
  });
};

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
