import { MutationResolvers } from '../../generated/graphql';

export const Mutation: MutationResolvers = {
  proposeMeeting: async (_, { input }, ctx) => {
    const res = await ctx.prisma.meeting.create({
      data: {
        topic: input.topic,
        proposed_times: {
          create: input.proposed_times.map((x) => {
            return { time: new Date(x) };
          }),
        },
        mentee: { connect: { id: parseInt(input.menteeId) } },
        mentor: { connect: { id: parseInt(input.mentorId) } },
      },
      include: {
        proposed_times: true,
      },
    });

    console.log('res:', res);
    return res.id.toString();
  },
  createMeeting: async (_, { input }, ctx) => {
    const res = await ctx.prisma.meeting.update({
      where: {
        id: parseInt(input.id),
      },
      data: {
        start_time: input.start_time,
      },
    });

    console.log('res:', res);
    return true;
  },
  cancelMeeting: async (_, { input }, ctx) => {
    const res = await ctx.prisma.meeting.update({
      where: {
        id: parseInt(input.id),
      },
      data: {
        cancelled: true,
        cancel_reason: input.cancel_reason,
      },
    });

    console.log('res:', res);
    return true;
  },
};
