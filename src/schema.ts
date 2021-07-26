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
    'SKILLS_FOR_SUCCESS',
    'WORK_LIFE_BALANCE',
    'RESUME_CRITIQUE',
  ],
});

export const Skill_Type = enumType({
  name: 'Skill_Type',
  members: ['SOFT', 'HARD'],
});

export const Family = enumType({
  name: 'Family',
  members: ['GENERAL', 'PROGRAMMING', 'MULTIMEDIA', 'QUANTITATIVE'],
});

const University = objectType({
  name: 'University',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.list.string('city');
    t.nonNull.string('province');
    t.nonNull.string('country');
    t.nonNull.string('language');
    t.nonNull.string('category');
    t.nonNull.int('undergrad_count');
    t.nonNull.int('postgrad_count');
    t.nonNull.int('total_count');
    t.nonNull.int('year_founded');
    t.nonNull.int('size_score');
  },
});

const Skills = objectType({
  name: 'Skills',
  definition(t) {
    t.nonNull.string('skill');
    t.nonNull.field('skill_type', { type: Skill_Type });
    t.nonNull.field('family', { type: Family });
    t.nonNull.list.string('role');
    t.nonNull.list.string('purpose');
  },
});

const Languages = objectType({
  name: 'Languages',
  definition(t) {
    t.nonNull.string('language');
    t.nonNull.string('country');
    t.nonNull.string('continent');
    t.nonNull.int('population');
  },
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
    t.nullable.string('degree_type');
    t.nonNull.int('id');
    t.nullable.int('school_year');
  },
});

const Mentee = objectType({
  name: 'Mentee',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('job_title_primary');
    t.nullable.string('job_title_secondary');
    t.nullable.string('bio');
    t.nonNull.list.field('preferred_services', { type: Services });
    t.nonNull.list.string('school');
    t.nonNull.string('school_major');
    t.nullable.string('degree_type');
    t.nonNull.int('id');
    t.nullable.int('school_year');
  },
});

const Query = queryType({
  definition(t) {
    t.list.field('Mentors', {
      type: Mentor,
      description: 'Find all mentors',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.mentor.findMany();
      },
    });
    t.list.field('Mentees', {
      type: Mentor,
      description: 'Find all mentees',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.mentee.findMany();
      },
    });
    t.field('Mentor', {
      type: Mentor,
      description: 'Find first mentors',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.mentor.findFirst();
      },
    });
    t.field('Universities', {
      type: University,
      description: 'Fetch all University dat',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.university.findMany();
      },
    });
    t.field('Skills', {
      type: Skills,
      description: 'Fetch all University dat',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.skills.findMany();
      },
    });
    t.field('Languages', {
      type: Languages,
      description: 'Fetch all University dat',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.languages.findMany();
      },
    });
    t.field('Mentee', {
      type: Mentee,
      description: 'Find first mentee',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.mentee.findFirst();
      },
    });
  },
});

export const schema = makeSchema({
  types: { Query, Mentor, Mentee, University, Languages, Skills },
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
