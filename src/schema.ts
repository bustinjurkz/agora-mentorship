import { enumType, makeSchema, objectType, queryType } from '@nexus/schema';
import path from 'path';

export const Services = enumType({
  name: 'Services',
  members: [
    'CAREER_DEVELOPMENT',
    'GENERAL',
    'MOCK_INTERVIEW',
    'CAREER_PLANNING',
    'SUCCESS_AT_WORK',
  ],
});

const Mentor = objectType({
  name: 'Mentor',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('job_title_primary');
    t.nullable.string('job_title_secondary');
    t.nullable.string('bio');
    t.nonNull.list.field('preferred_services', { type: Services });
    t.nonNull.list.string('school');
    t.nonNull.string('school_major');
    t.nonNull.int('id');
    t.nullable.int('school_year');
  },
});

const Query = queryType({
  definition(t) {
    t.field('Mentor', {
      type: Mentor,
      resolve: (_, _args, ctx) => {
        return ctx.prisma.mentor.findFirst();
      },
    });
  },
});

export const schema = makeSchema({
  types: { Query, Mentor },
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
    typegen: path.join(process.cwd(), 'nexus.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});
