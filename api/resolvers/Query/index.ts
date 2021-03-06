import { scoreAlgorithm } from '@api/scoreAlgorithm';
import { QueryResolvers } from '../../generated/graphql';

export const Query: QueryResolvers = {
  user: (_, { id }, ctx) => {
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
      language: languages.sort(function (a, b) {
        return a.language.localeCompare(b.language);
      }),
      majors: majors.sort(function (a, b) {
        return a.major.localeCompare(b.major);
      }),
      university: universities.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      }),
      skills: skills.sort(function (a, b) {
        return a.skill.localeCompare(b.skill);
      }),
    };
  },
  login: async (_, { email }, ctx) => {
    const user = await ctx.prisma.user.findFirst({
      where: { email: email },
      select: {
        id: true,
        mentor: {
          select: {
            id: true,
          },
        },
      },
    });

    return {
      id: user?.id.toString() ?? '',
      isMentor: user?.mentor?.id ? true : false,
    };
  },
};
