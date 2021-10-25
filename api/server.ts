import { Prisma, PrismaClient } from '@prisma/client';
import { ApolloError, ApolloServer, gql } from 'apollo-server-micro';
import { GraphQLError } from 'graphql';
import { Context } from './context';
import * as resolvers from './resolvers';
import fs from 'fs';
import path from 'path';

export interface MakeGraphServerInput {
  tracing?: boolean;
  logError?: (err: GraphQLError) => void;
  isTest: boolean;
  dbLogging?: Prisma.PrismaClientOptions['log'];
}

export interface MakeGraphServerResult {
  server: ApolloServer;
  prisma: PrismaClient;
  cleanup: () => Promise<void>;
}

export function makeGraphServer(
  input: MakeGraphServerInput,
): MakeGraphServerResult {
  const prisma = new PrismaClient({
    log: input.dbLogging,
  });
  const prodTypeDefs = `scalar Date

  enum Family {
    GENERAL
    MULTIMEDIA
    PROGRAMMING
    QUANTITATIVE
  }
  
  enum Skill_Type {
    HARD
    SOFT
  }
  
  enum Services {
    CAREER_DEVELOPMENT
    CAREER_PLANNING
    GENERAL
    MOCK_INTERVIEW
    RESUME_CRITIQUE
    SKILLS_FOR_SUCCESS
    SUCCESS_AT_WORK
    WORK_LIFE_BALANCE
  }
  
  type User {
    id: ID
    email: String
    password: String
    mentee: Mentee
    mentor: Mentor
    language: [Language]
    majors: [Majors]
    skills: [Skills]
    university: [University]
  }
  
  type Mentee {
    id: ID
    bio: String
    job_title_primary: String
    job_title_secondary: String
    preferred_services: [Services]!
    birthyear: Int!
    degree_type: String
    highest_education: Int!
    name: String!
    school_year: Int
    years_experience: Int!
    mentors: [MentorWithScore]
    meetings: [Meeting]
    userId: ID
  }
  
  type MentorWithScore {
    mentor: User
    score: Int
  }
  
  type RegisterInputs {
    language: [Language]
    skills: [Skills]
    university: [University]
    majors: [Majors]
  }
  
  type Mentor {
    id: ID!
    bio: String
    job_title_primary: String!
    job_title_secondary: String
    preferred_services: [Services]!
    birthyear: Int!
    degree_type: String
    highest_education: Int!
    school_year: Int
    name: String!
    years_experience: Int!
    userId: ID
    meetings: [Meeting]
    availability: [Availability]
  }
  
  type Meeting {
    id: Int!
    topic: Services
    start_time: Date
    end_time: Date
    cancelled: Boolean
    cancel_reason: String
    proposed_times: [Proposed_Time]
    menteeId: ID!
    mentorId: ID!
    mentor: Mentor
    mentee: Mentee
  }
  
  type Proposed_Time {
    id: Int!
    meeting_id: Int
    time: Date
  }
  
  type Availability {
    id: ID!
    time: Date
    mentorId: ID!
  }
  
  type Language {
    id: ID!
    continent: String!
    country: String!
    language: String!
    population: Int!
  }
  
  type Majors {
    id: ID!
    faculty: String!
    major: String!
  }
  
  type Skills {
    id: ID!
    family: Family!
    purpose: [String]!
    role: [String]!
    skill: String!
    skill_type: Skill_Type!
  }
  
  type University {
    id: ID!
    category: String!
    city: [String]!
    country: String!
    language: String!
    name: String!
    postgrad_count: Int!
    province: String!
    size_score: Int!
    total_count: Int!
    undergrad_count: Int!
    year_founded: Int!
  }
  
  type LoginResponse {
    id: ID!
    isMentor: Boolean!
  }
  
  input MenteeRegister {
    bio: String
    job_title_primary: String
    job_title_secondary: String
    preferred_services: [Services]!
    birthyear: Int!
    degree_type: String
    name: String!
    school_year: Int
    years_experience: Int!
  }
  
  input MentorRegister {
    bio: String
    job_title_primary: String!
    job_title_secondary: String
    preferred_services: [Services]!
    birthyear: Int!
    degree_type: String
    name: String!
    school_year: Int
    years_experience: Int!
    availability: [Date!]!
  }
  
  type Query {
    "Find a single User"
    user(id: ID!): User
  
    "Find a single User with Mentors and the respective score"
    userMentors(id: ID!): [MentorWithScore]
  
    "Find all Universities"
    universities: [University]
  
    "Find all majors"
    majors: [Majors]
  
    "Find all skills"
    skills: [Skills]
  
    "Find all languages"
    languages: [Language]
  
    "Find all register input selections"
    registerInputs: RegisterInputs
  
    "Get user ID from an email"
    login(email: String!): LoginResponse
  }
  
  type Mutation {
    "Proposes a meeting with 3 suggested times"
    proposeMeeting(input: ProposeMeetingInput!): ID
  
    "Cancels a meeting with the reason"
    cancelMeeting(input: CancelMeetingInput!): Boolean
  
    "Confirms a meeting with the agreed-upon time"
    createMeeting(input: CreateMeetingInput!): Boolean
  
    "Creates a user in the registration process"
    createUser(input: CreateUserInput!): Boolean
  }
  
  input ProposeMeetingInput {
    topic: Services!
    proposed_times: [Date!]! #2021-08-16T14:00:00.000
    menteeId: ID!
    mentorId: ID!
  }
  
  input CancelMeetingInput {
    id: ID!
    cancel_reason: String!
  }
  
  input CreateUserInput {
    email: String!
    password: String!
    mentee: MenteeRegister
    mentor: MentorRegister
    language: [String!]!
    skills: [String!]!
    university: [String!]!
    majors: [String!]!
  }
  
  input CreateMeetingInput {
    id: ID!
    start_time: Date!
    topic: Services!
    mentorEmail: String!
    mentorName: String!
    menteeName: String!
    menteeUserId: ID!
  }
  `;

  return {
    prisma,
    cleanup: () => prisma.$disconnect(),
    server: new ApolloServer({
      typeDefs: gql(
        input.isTest
          ? fs
              .readFileSync(path.join(process.cwd(), '/schema.graphql'))
              .toString()
          : prodTypeDefs,
      ),
      resolvers: resolvers as any,
      context: () => {
        const context: Context = { prisma, isTest: true };
        return context;
      },
      playground: true,
      tracing: input.tracing,
      formatError: (err) => {
        console.log(input, err);
        if (err.extensions?.code === 'INTERNAL_SERVER_ERROR') {
          if (input.logError) input.logError(err);
          return new ApolloError(
            'Internal Server Error',
            'INTERNAL_SERVER_ERROR',
          );
        }
        return err;
      },
    }),
  };
}
