import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ['query'] });
  try {
    const mentees = await prisma.mentee.create({
      data: {
        name: 'Dusty',
        bio: 'Full stack web developer with a focus on sleek front-ends',
        job_title_primary: 'Web Developer',
        job_title_secondary: 'Front-End',
        degree_type: 'Bachelors',
        preferred_services: 'MOCK_INTERVIEW',
        school: 'McMaster University',
        school_major: 'Computer Science',
        school_year: 2019,
      },
    });
    res.json({ mentees });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to add mentee' });
  } finally {
    await prisma.$disconnect();
  }
}
