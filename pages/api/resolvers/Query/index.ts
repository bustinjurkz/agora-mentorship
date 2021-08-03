import { QueryResolvers } from '../../generated/graphql';

export const Query: QueryResolvers = {
  user: (_, { id }, ctx) => {
    //validate.canRead(ctx);
    return ctx.prisma.findFirst({
      where: { id: id },
    });
  },
  // plants: (_, _args, ctx) => {
  //   // validate.canRead(ctx);
  //   return ctx.prisma.plant.findMany();
  // },
};
