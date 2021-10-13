import {
  // Language,
  // Majors,
  // Skills,
  // University,
  // MajorSimilarity,
  PrismaClient,
} from '@prisma/client';
// import { languages } from './sample-data/languages';

import { users } from './sample-data/users';
// import { universities } from './sample-data/universities';
// import { skills } from './sample-data/skills';
// import { majors } from './sample-data/majors';
// import { major_similarity } from './sample-data/major_similarity';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

export const seed = async () => {
  await prisma.mentee.deleteMany();
  await prisma.mentor.deleteMany();
  await prisma.user.deleteMany();

  // await prisma.language.deleteMany();
  // await prisma.skills.deleteMany();
  // await prisma.university.deleteMany();
  // await prisma.majors.deleteMany();
  // await prisma.majorSimilarity.deleteMany();

  // await prisma.meeting.deleteMany();
  // await prisma.availability.deleteMany();
  // await prisma.proposed_Time.deleteMany();

  // for (const major of majors) {
  //   const majorAdded = await prisma.majors.create({
  //     data: major as Majors,
  //   });
  //   console.log(`Created major with ID ${majorAdded.id}`);
  // }
  // for (const language of languages) {
  //   const languageAdded = await prisma.language.create({
  //     data: language as Language,
  //   });
  //   console.log(`Created language with ID ${languageAdded.id}`);
  // }
  // for (const skill of skills) {
  //   const skillAdded = await prisma.skills.create({
  //     data: skill as Skills,
  //   });
  //   console.log(`Created skill with ID ${skillAdded.id}`);
  // }

  // for (const university of universities) {
  //   const universityAdded: University = await prisma.university.create({
  //     data: {
  //       name: university.name,
  //       city: university.city,
  //       province: university.province,
  //       country: university.country,
  //       language: university.language,
  //       category: university.category,
  //       undergrad_count: parseInt(university.undergrad_count),
  //       postgrad_count: parseInt(university.postgrad_count),
  //       total_count: parseInt(university.total_count),
  //       year_founded: parseInt(university.year_founded),
  //       size_score: parseInt(university.size_score),
  //     },
  //   });
  //   console.log(`Created university with ID ${universityAdded.id}`);
  // }

  // for (const score of major_similarity) {
  //   const scoreAdded: MajorSimilarity = await prisma.majorSimilarity.create({
  //     data: score as unknown as MajorSimilarity,
  //   });
  //   console.log(`Created score with ID ${scoreAdded.id}`);
  // }

  for (const user of users) {
    await prisma.user
      .create({
        data: {
          email: user.email,
          password: user.password,
        },
      })

      .then(async (x) => {
        console.log('CREATED USER WITH ID: ', x.id);
        if (user.mentee) {
          await prisma.user.update({
            where: {
              id: x.id,
            },
            data: {
              language: {
                connect: user.language.map((x) => {
                  return { language: x };
                }),
              },
              university: {
                connect: user.university.map((x) => {
                  return { name: x };
                }),
              },
              majors: {
                connect: user.majors.map((x) => {
                  return { major: x };
                }),
              },
              skills: {
                connect: user.skills.map((x) => {
                  return { skill: x };
                }),
              },

              mentee: {
                create: user.mentee,
              },
            },
          });
        } else {
          await prisma.user.update({
            where: {
              id: x.id,
            },
            data: {
              language: {
                connect: user.language.map((x) => {
                  return { language: x };
                }),
              },
              university: {
                connect: user.university.map((x) => {
                  return { name: x };
                }),
              },
              majors: {
                connect: user.majors.map((x) => {
                  return { major: x };
                }),
              },
              skills: {
                connect: user.skills.map((x) => {
                  return { skill: x };
                }),
              },

              mentor: {
                create: {
                  birthyear: user.mentor!.birthyear,
                  degree_type: user.mentor!.degree_type,
                  highest_education: user.mentor!.highest_education,
                  job_title_primary: user.mentor!.job_title_primary,
                  name: user.mentor!.name,
                  years_experience: user.mentor!.years_experience,
                  bio: user.mentor!.bio,
                  job_title_secondary: user.mentor?.job_title_secondary,
                  preferred_services: user.mentor?.preferred_services,
                  school_year: user.mentor!.school_year,
                  availability: {
                    create: user.mentor!.availability.map((x) => {
                      return { time: x };
                    }),
                  },
                },
              },
            },
          });
        }
      });
  }
};

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
