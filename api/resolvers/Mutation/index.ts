import { MutationResolvers } from '../../generated/graphql';

export const Mutation: MutationResolvers = {
  createMeeting: async (_, { input }, ctx) => {
    console.log('input is: ', input);
    // const x = input.proposed_times.reduce((x: String) =>

    // );
    // console.log('x: ', x);

    // const xs = [new Date(), new Date(), new Date()];
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
};
