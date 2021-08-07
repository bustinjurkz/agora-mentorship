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
};




