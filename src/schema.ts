import { enumType, makeSchema, objectType, queryType } from 'nexus';
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

export const Major = enumType({
  name: 'Major',
  members: [
    'ARTS_AND_SCIENCE',
    'COMPUTER_SCIENCE',
    'BUSINESS_INFORMATICS',
    'HUMAN_BEHAVIOUR',
    'ENGINEERING',
    'CHEMICAL_ENGINEERING',
    'CIVIL_ENGINEERING',
    'COMPUTER_ENGINEERING',
    'ELECTRICAL_ENGINEERING',
    'ELECTRICAL_AND_BIOMEDICAL_ENGINEERING',
    'MATERIALS_ENGINEERING',
    'MECHANICAL_ENGINEERING',
    'MECHATRONICS_ENGINEERING',
    'NANOTECHNOLOGY_ENGINEERING',
    'SOFTWARE_ENGINEERING',
    'AEROSPACE_ENGINEERING',
    'B_TECH',
    'AUTOMATION_ENGINEERING',
    'AUTOMOTIVE_AND_VEHICLE_ENGINEERING_TECHNOLOGY',
    'BIOTECHNOLOGY',
    'CIVIL_ENGINEERING_INFRASTRUCTURE_TECHNOLOGY',
    'MANUFACTURING_ENGINEERING_TECHNOLOGY',
    'POWER_AND_ENERGY_ENGINEERING_TECHNOLOGY',
    'SOFTWARE_ENGINEERING_AND_TECHNOLOGY',
    'HEALTH_SCIENCES',
    'ENGINEERING_SCIENCE_AND_ENTREPRENEURSHIP',
    'BIOLOGY_AND_PHARMACOLOGY',
    'MIDWIFERY_PROGRAM',
    'PHYSICIAN_ASSISTANT',
    'NURSING',
    'ECONOMICS',
    'HEALTH_AND_SOCIETY',
    'HUMANITIES',
    'SOCIAL_SCIENCES',
    'ART_HISTORY',
    'ARCHAEOLOGY',
    'ANTHROPOLOGY',
    'AGING_AND_SOCIETY',
    'CLASSICS',
    'COGNITIVE_SCIENCE',
    'COMMUNICATION_STUDIES',
    'ENGLISH_AND_CULTURAL_STUDIES',
    'FRENCH',
    'GEOGRAPHY',
    'HISTORY',
    'INDIGENOUS_STUDIES',
    'JUSTICE_POLITICAL_PHILOSOPHY_AND_LAW',
    'LABOUR_STUDIES',
    'LINGUISTICS',
    'MULTIMEDIA',
    'PHILOSOPHY',
    'POLITICAL_SCIENCE',
    'SOCIETY_CULTURE_AND_RELIGION',
    'SOCIAL_PSYCHOLOGY',
    'SOCIOLOGY',
    'THEATRE_AND_FILM',
    'MUSIC',
    'STUDIO_ART',
    'SOCIAL_WORK',
    'LAW',
    'CHEMICAL_AND_PHYSICAL_SCIENCES',
    'INTEGRATED_SCIENCES',
    'LIFE_SCIENCES',
    'MATHEMATICS_AND_STATISTICS',
    'BIOSTATISTICS',
    'DATA_SCIENCE',
    'EARTH_AND_ENVIRONMENTAL_SCIENCES',
    'ACTUARIAL_AND_FINANCIAL_MATHEMATICS',
    'ASTROPHYSICS',
    'BIOCHEMISTRY',
    'BIOLOGY',
    'CHEMICAL_BIOLOGY',
    'CHEMISTRY',
    'ENVIRONMENTAL_SCIENCES',
    'COMPUTATIONAL_MATHEMATICS',
    'NEUROSCIENCE',
    'PHYSICS',
    'PSYCHOLOGY_NEUROSCIENCE_AND_BEHAVIOUR',
    'KINESIOLOGY',
    'MEDICAL_RADIATION',
  ],
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

const Majors = objectType({
  name: 'Majors',
  definition(t) {
    t.nonNull.string('major');
    t.nonNull.string('faculty');
  },
});

// const MajorSimilarity = objectType({
//   name: 'MajorSimilarity',
//   definition(t) {
//     t.nonNull.field('ARTS_AND_SCIENCE', {type: MajorSimilarity});
//     t.nonNull.string('faculty');
//   },
// });

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

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('email');
  },
});

const Mentor = objectType({
  name: 'Mentor',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('job_title_primary');
    t.nullable.string('job_title_secondary');
    t.nonNull.int('years_experience');
    t.nullable.string('bio');
    t.nonNull.list.field('preferred_services', { type: Services });
    t.nonNull.string('degree_type');
    t.nullable.int('school_year');
    t.nonNull.int('highest_education');
    t.nonNull.list.nonNull.field('language', {
      type: 'Languages',
      resolve(mentor, _, ctx) {
        return ctx.prisma.languages.findMany({
          where: {
            language: {
              in: user.language.filter((x) => !!x).map((x) => x!),
            },
          },
        });
      },
    });
    t.nonNull.list.string('ski');
  },
});

const Mentee = objectType({
  name: 'Mentee',
  definition(t) {
    t.nonNull.string('name');
    // nullable as the mentee might not have a job
    t.nullable.string('job_title_primary');
    t.nullable.string('job_title_secondary');
    t.nonNull.int('years_experience');
    t.nullable.string('bio');
    t.nonNull.list.field('preferred_services', { type: Services });
    t.nonNull.list.string('school');
    t.nonNull.string('school_major');
    t.nullable.string('degree_type');
    t.nullable.int('school_year');
    t.nonNull.int('highest_education');
    t.nonNull.int('birthyear');
    t.nonNull.list.string('language');
    t.nonNull.list.string('skills');
  },
});

const Query = queryType({
  definition(t) {
    t.list.field('mentors', {
      type: 'Mentor',
      description: 'Find all mentors',
      resolve: (_, _args, ctx) => {
        // SourceType

        // GraphQL types, Typescript Types
        // return a thing from db
        return ctx.prisma.mentor.findMany({
          include: { language: true },
        });
      },
    });
    t.list.field('mentees', {
      type: Mentee,
      description: 'Find all mentees',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.mentee.findMany();
      },
    });
    t.field('Mentor', {
      type: Mentor,
      description: 'Find first mentor',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.mentor.findFirst();
      },
    });
    t.field('Mentee', {
      type: Mentee,
      description: 'Find first mentee',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.mentee.findFirst();
      },
    });
    t.list.field('Universities', {
      type: University,
      description: 'Fetch all University data',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.university.findMany();
      },
    });
    t.field('Skills', {
      type: Skills,
      description: 'Fetch all Skills data',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.skills.findMany();
      },
    });
    // t.field('Languages', {
    //   type: Languages,
    //   description: 'Fetch all Languages data',
    //   resolve: (_, _args, ctx) => {
    //     return ctx.prisma.
    //   },
    // });
    t.field('Majors', {
      type: Majors,
      description: 'Find all majors',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.majors.findMany();
      },
    });
    // t.field('MajorSimilarity', {
    //   type: MajorSimilarity,
    //   description: 'Fetch values from matrix',
    //   resolve: (_, _args, ctx) => {
    //     return ctx.prisma.majorSimilarity.findMany();
    //   },
    // });
  },
});

export const schema = makeSchema({
  types: {
    Query,
    Mentor,
    Mentee,
    University,
    Languages,
    Skills,
    Majors,
    User,
  },
  outputs: {
    schema: path.join(process.cwd(), '/generated/schema.graphql'),
    typegen: path.join(process.cwd(), '/generated/nexus-codegen.ts'),
  },
  contextType: {
    module: path.join(process.cwd(), 'src/context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: require.resolve('../generated/prisma/client/index.d.ts'),
        alias: 'prisma',
        typeMatch: (type) => new RegExp(`(?:interface)\\s+(${type.name}s)\\W`),
      },
    ],
  },
});
