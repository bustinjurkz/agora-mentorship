import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ['query'] });
  try {
    const mentees = await prisma.mentee.findMany();
    res.json({ mentees });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to fetch mentees' });
  } finally {
    await prisma.$disconnect();
  }
}
