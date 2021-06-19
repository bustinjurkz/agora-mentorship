import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ['query'] });
  try {
    const mentors = await prisma.mentor.create({
      data: {
        name: 'Atinder',
        bio: 'Very good data scientist with 5+ years of experience',
        job_title_primary: 'Data Scientist',
        job_title_secondary: 'Level II Mage',
        preferred_services: 'MOCK_INTERVIEW',
        school: 'McMaster University',
        school_major: 'Statistics',
        school_year: 2017,
      },
    });
    res.json({ mentors });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to fetch mentors' });
  } finally {
    await prisma.$disconnect();
  }
}
