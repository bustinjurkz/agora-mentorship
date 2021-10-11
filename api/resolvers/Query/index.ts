import { scoreAlgorithm } from '@api/scoreAlgorithm';
import { QueryResolvers } from '../../generated/graphql';

export const Query: QueryResolvers = {
  user: (_, { id }, ctx) => {
    console.log('YEET?');
    return ctx.prisma.user.findFirst({
      where: { id: parseInt(id) },
      include: {
        language: true,
        majors: true,
        mentee: {
          include: {
            meetings: {
              include: {
                mentor: true,
                proposed_times: true,
              },
            },
          },
        },
        mentor: {
          include: {
            availability: true,
            meetings: {
              include: {
                mentee: true,
                proposed_times: true,
              },
            },
          },
        },
        skills: true,
        university: true,
      },
    });
  },
  userMentors: async (_, { id }, ctx) => {
    // Fetches mentee to be used in the score calculation
    const mentee = await ctx.prisma.user.findFirst({
      where: { id: parseInt(id) },
      include: {
        language: true,
        majors: true,
        mentee: true,
        mentor: false,
        skills: true,
        university: true,
      },
    });

    // TODO: Add logic to only return mentors that are compatible with the mentee
    // Fetches all mentors
    const mentors = await ctx.prisma.user.findMany({
      where: { mentee: null },
      include: {
        language: true,
        majors: true,
        mentee: true,
        mentor: {
          include: {
            availability: true,
            meetings: true,
          },
        },
        skills: true,
        university: true,
      },
    });

    const majors = mentee?.majors.map((x) => x.major)!;

    const matrix = await ctx.prisma.majorSimilarity.findMany({
      where: { name: { in: majors } },
    });

    return mentors.map((x) => {
      return {
        mentor: x,
        score: scoreAlgorithm(mentee!, x, matrix),
      };
    });
  },
  registerInputs: async (_, __, ctx) => {
    const languages = await ctx.prisma.language.findMany();
    const majors = await ctx.prisma.majors.findMany();
    const universities = await ctx.prisma.university.findMany();
    const skills = await ctx.prisma.skills.findMany();

    return {
      language: languages,
      majors: majors,
      university: universities,
      skills: skills,
    };
  },
};
