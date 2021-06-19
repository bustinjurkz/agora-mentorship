import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ['query'] });
  try {
    const mentors = await prisma.mentor.findMany();
    res.json({ mentors });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to fetch mentors' });
  } finally {
    await prisma.$disconnect();
  }
}
