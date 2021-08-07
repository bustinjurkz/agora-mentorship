import { QueryResolvers } from '../../generated/graphql';

export const Query: QueryResolvers = {
  user: (_, { id }, ctx) => {
    return ctx.prisma.user.findFirst({
      where: { id: parseInt(id) },
      include: {
        language: true,
        majors: true,
        mentee: true,
        mentor: true,
        skills: true,
        university: true,
      },
    });
  },
  userMentors: async (_, { id }, ctx) => {
    // const user = await ctx.prisma.user.find

    // TODO: Add logic to only return mentors that are compatible with the mentee
    const res = await ctx.prisma.user.findMany({
      where: { mentor: { isNot: null } },
      include: {
        language: true,
        majors: true,
        mentee: true,
        mentor: true,
        skills: true,
        university: true,
      },
    });

    return res.map((x) => {
      return {
        mentor: x,
        score: 69,
      };
    });
  },
};
