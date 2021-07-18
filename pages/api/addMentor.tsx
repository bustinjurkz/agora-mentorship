import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ['query'] });
  try {
    const mentors = await prisma.mentor.create({
      data: {
        name: 'Jane Doe',
        bio: 'Unreal Wealth Advanced Analyzer',
        job_title_primary: 'Data Science Associate',
        job_title_secondary: 'Wealth Advanced Analytics',
        preferred_services: [
          'CAREER_DEVELOPMENT',
          'SUCCESS_AT_WORK',
          'MOCK_INTERVIEW',
        ],
        school: 'Brock University',
        school_major: 'BUSINESS',
        school_year: 2015,
      },
    });
    res.json({ mentors });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to add mentor' });
  } finally {
    await prisma.$disconnect();
  }
}
