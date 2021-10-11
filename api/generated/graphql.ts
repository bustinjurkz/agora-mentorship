import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel, University as UniversityModel, Majors as MajorsModel, Skills as SkillsModel, Language as LanguageModel } from '@db/client';
import { Context } from '@api/context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Availability = {
  __typename?: 'Availability';
  id: Scalars['ID'];
  time?: Maybe<Scalars['Date']>;
  mentorId: Scalars['ID'];
};

export type CancelMeetingInput = {
  id: Scalars['ID'];
  cancel_reason: Scalars['String'];
};

export type CreateMeetingInput = {
  id: Scalars['ID'];
  start_time: Scalars['Date'];
  topic: Services;
  mentorEmail: Scalars['String'];
  mentorName: Scalars['String'];
  menteeName: Scalars['String'];
  menteeUserId: Scalars['ID'];
};


export enum Family {
  General = 'GENERAL',
  Multimedia = 'MULTIMEDIA',
  Programming = 'PROGRAMMING',
  Quantitative = 'QUANTITATIVE'
}

export type Language = {
  __typename?: 'Language';
  id: Scalars['ID'];
  continent: Scalars['String'];
  country: Scalars['String'];
  language: Scalars['String'];
  population: Scalars['Int'];
};

export type Majors = {
  __typename?: 'Majors';
  id: Scalars['ID'];
  faculty: Scalars['String'];
  major: Scalars['String'];
};

export type Meeting = {
  __typename?: 'Meeting';
  id: Scalars['Int'];
  topic?: Maybe<Services>;
  start_time?: Maybe<Scalars['Date']>;
  end_time?: Maybe<Scalars['Date']>;
  cancelled?: Maybe<Scalars['Boolean']>;
  cancel_reason?: Maybe<Scalars['String']>;
  proposed_times?: Maybe<Array<Maybe<Proposed_Time>>>;
  menteeId: Scalars['ID'];
  mentorId: Scalars['ID'];
  mentor?: Maybe<Mentor>;
  mentee?: Maybe<Mentee>;
};

export type Mentee = {
  __typename?: 'Mentee';
  id?: Maybe<Scalars['ID']>;
  bio?: Maybe<Scalars['String']>;
  job_title_primary?: Maybe<Scalars['String']>;
  job_title_secondary?: Maybe<Scalars['String']>;
  preferred_services: Array<Maybe<Services>>;
  birthyear: Scalars['Int'];
  degree_type?: Maybe<Scalars['String']>;
  highest_education: Scalars['Int'];
  name: Scalars['String'];
  school_year?: Maybe<Scalars['Int']>;
  years_experience: Scalars['Int'];
  mentors?: Maybe<Array<Maybe<MentorWithScore>>>;
  meetings?: Maybe<Array<Maybe<Meeting>>>;
  userId?: Maybe<Scalars['ID']>;
};

export type Mentor = {
  __typename?: 'Mentor';
  id: Scalars['ID'];
  bio?: Maybe<Scalars['String']>;
  job_title_primary: Scalars['String'];
  job_title_secondary?: Maybe<Scalars['String']>;
  preferred_services: Array<Maybe<Services>>;
  birthyear: Scalars['Int'];
  degree_type?: Maybe<Scalars['String']>;
  highest_education: Scalars['Int'];
  school_year?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  years_experience: Scalars['Int'];
  userId?: Maybe<Scalars['ID']>;
  meetings?: Maybe<Array<Maybe<Meeting>>>;
  availability?: Maybe<Array<Maybe<Availability>>>;
};

export type MentorWithScore = {
  __typename?: 'MentorWithScore';
  mentor?: Maybe<User>;
  score?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Proposes a meeting with 3 suggested times */
  proposeMeeting?: Maybe<Scalars['ID']>;
  /** Cancels a meeting with the reason */
  cancelMeeting?: Maybe<Scalars['Boolean']>;
  /** Confirms a meeting with the agreed-upon time */
  createMeeting?: Maybe<Scalars['Boolean']>;
};


export type MutationProposeMeetingArgs = {
  input: ProposeMeetingInput;
};


export type MutationCancelMeetingArgs = {
  input: CancelMeetingInput;
};


export type MutationCreateMeetingArgs = {
  input: CreateMeetingInput;
};

export type ProposeMeetingInput = {
  topic: Services;
  proposed_times: Array<Scalars['Date']>;
  menteeId: Scalars['ID'];
  mentorId: Scalars['ID'];
};

export type Proposed_Time = {
  __typename?: 'Proposed_Time';
  id: Scalars['Int'];
  meeting_id?: Maybe<Scalars['Int']>;
  time?: Maybe<Scalars['Date']>;
};

export type Query = {
  __typename?: 'Query';
  /** Find a single User */
  user?: Maybe<User>;
  /** Find a single User with Mentors and the respective score */
  userMentors?: Maybe<Array<Maybe<MentorWithScore>>>;
  /** Find all Universities */
  universities?: Maybe<Array<Maybe<University>>>;
  /** Find all majors */
  majors?: Maybe<Array<Maybe<Majors>>>;
  /** Find all skills */
  skills?: Maybe<Array<Maybe<Skills>>>;
  /** Find all languages */
  languages?: Maybe<Array<Maybe<Language>>>;
  /** Find all register input selections */
  registerInputs?: Maybe<RegisterInputs>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserMentorsArgs = {
  id: Scalars['ID'];
};

export type RegisterInputs = {
  __typename?: 'RegisterInputs';
  language?: Maybe<Array<Maybe<Language>>>;
  skills?: Maybe<Array<Maybe<Skills>>>;
  university?: Maybe<Array<Maybe<University>>>;
  majors?: Maybe<Array<Maybe<Majors>>>;
};

export enum Services {
  CareerDevelopment = 'CAREER_DEVELOPMENT',
  CareerPlanning = 'CAREER_PLANNING',
  General = 'GENERAL',
  MockInterview = 'MOCK_INTERVIEW',
  ResumeCritique = 'RESUME_CRITIQUE',
  SkillsForSuccess = 'SKILLS_FOR_SUCCESS',
  SuccessAtWork = 'SUCCESS_AT_WORK',
  WorkLifeBalance = 'WORK_LIFE_BALANCE'
}

export enum Skill_Type {
  Hard = 'HARD',
  Soft = 'SOFT'
}

export type Skills = {
  __typename?: 'Skills';
  id: Scalars['ID'];
  family: Family;
  purpose: Array<Maybe<Scalars['String']>>;
  role: Array<Maybe<Scalars['String']>>;
  skill: Scalars['String'];
  skill_type: Skill_Type;
};

export type University = {
  __typename?: 'University';
  id: Scalars['ID'];
  category: Scalars['String'];
  city: Array<Maybe<Scalars['String']>>;
  country: Scalars['String'];
  language: Scalars['String'];
  name: Scalars['String'];
  postgrad_count: Scalars['Int'];
  province: Scalars['String'];
  size_score: Scalars['Int'];
  total_count: Scalars['Int'];
  undergrad_count: Scalars['Int'];
  year_founded: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  mentee?: Maybe<Mentee>;
  mentor?: Maybe<Mentor>;
  language?: Maybe<Array<Maybe<Language>>>;
  majors?: Maybe<Array<Maybe<Majors>>>;
  skills?: Maybe<Array<Maybe<Skills>>>;
  university?: Maybe<Array<Maybe<University>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Availability: ResolverTypeWrapper<Availability>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  CancelMeetingInput: CancelMeetingInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  CreateMeetingInput: CreateMeetingInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Family: Family;
  Language: ResolverTypeWrapper<LanguageModel>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Majors: ResolverTypeWrapper<MajorsModel>;
  Meeting: ResolverTypeWrapper<Omit<Meeting, 'mentor' | 'mentee'> & { mentor?: Maybe<ResolversTypes['Mentor']>, mentee?: Maybe<ResolversTypes['Mentee']> }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mentee: ResolverTypeWrapper<Omit<Mentee, 'mentors' | 'meetings'> & { mentors?: Maybe<Array<Maybe<ResolversTypes['MentorWithScore']>>>, meetings?: Maybe<Array<Maybe<ResolversTypes['Meeting']>>> }>;
  Mentor: ResolverTypeWrapper<Omit<Mentor, 'meetings'> & { meetings?: Maybe<Array<Maybe<ResolversTypes['Meeting']>>> }>;
  MentorWithScore: ResolverTypeWrapper<Omit<MentorWithScore, 'mentor'> & { mentor?: Maybe<ResolversTypes['User']> }>;
  Mutation: ResolverTypeWrapper<{}>;
  ProposeMeetingInput: ProposeMeetingInput;
  Proposed_Time: ResolverTypeWrapper<Proposed_Time>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInputs: ResolverTypeWrapper<Omit<RegisterInputs, 'language' | 'skills' | 'university' | 'majors'> & { language?: Maybe<Array<Maybe<ResolversTypes['Language']>>>, skills?: Maybe<Array<Maybe<ResolversTypes['Skills']>>>, university?: Maybe<Array<Maybe<ResolversTypes['University']>>>, majors?: Maybe<Array<Maybe<ResolversTypes['Majors']>>> }>;
  Services: Services;
  Skill_Type: Skill_Type;
  Skills: ResolverTypeWrapper<SkillsModel>;
  University: ResolverTypeWrapper<UniversityModel>;
  User: ResolverTypeWrapper<UserModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Availability: Availability;
  ID: Scalars['ID'];
  CancelMeetingInput: CancelMeetingInput;
  String: Scalars['String'];
  CreateMeetingInput: CreateMeetingInput;
  Date: Scalars['Date'];
  Language: LanguageModel;
  Int: Scalars['Int'];
  Majors: MajorsModel;
  Meeting: Omit<Meeting, 'mentor' | 'mentee'> & { mentor?: Maybe<ResolversParentTypes['Mentor']>, mentee?: Maybe<ResolversParentTypes['Mentee']> };
  Boolean: Scalars['Boolean'];
  Mentee: Omit<Mentee, 'mentors' | 'meetings'> & { mentors?: Maybe<Array<Maybe<ResolversParentTypes['MentorWithScore']>>>, meetings?: Maybe<Array<Maybe<ResolversParentTypes['Meeting']>>> };
  Mentor: Omit<Mentor, 'meetings'> & { meetings?: Maybe<Array<Maybe<ResolversParentTypes['Meeting']>>> };
  MentorWithScore: Omit<MentorWithScore, 'mentor'> & { mentor?: Maybe<ResolversParentTypes['User']> };
  Mutation: {};
  ProposeMeetingInput: ProposeMeetingInput;
  Proposed_Time: Proposed_Time;
  Query: {};
  RegisterInputs: Omit<RegisterInputs, 'language' | 'skills' | 'university' | 'majors'> & { language?: Maybe<Array<Maybe<ResolversParentTypes['Language']>>>, skills?: Maybe<Array<Maybe<ResolversParentTypes['Skills']>>>, university?: Maybe<Array<Maybe<ResolversParentTypes['University']>>>, majors?: Maybe<Array<Maybe<ResolversParentTypes['Majors']>>> };
  Skills: SkillsModel;
  University: UniversityModel;
  User: UserModel;
};

export type AvailabilityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Availability'] = ResolversParentTypes['Availability']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  mentorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type LanguageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Language'] = ResolversParentTypes['Language']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  continent?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  population?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MajorsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Majors'] = ResolversParentTypes['Majors']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  faculty?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  major?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeetingResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Meeting'] = ResolversParentTypes['Meeting']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['Services']>, ParentType, ContextType>;
  start_time?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  end_time?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  cancelled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  cancel_reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  proposed_times?: Resolver<Maybe<Array<Maybe<ResolversTypes['Proposed_Time']>>>, ParentType, ContextType>;
  menteeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mentorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mentor?: Resolver<Maybe<ResolversTypes['Mentor']>, ParentType, ContextType>;
  mentee?: Resolver<Maybe<ResolversTypes['Mentee']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenteeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mentee'] = ResolversParentTypes['Mentee']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  job_title_primary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  job_title_secondary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferred_services?: Resolver<Array<Maybe<ResolversTypes['Services']>>, ParentType, ContextType>;
  birthyear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  degree_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  highest_education?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  school_year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  years_experience?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mentors?: Resolver<Maybe<Array<Maybe<ResolversTypes['MentorWithScore']>>>, ParentType, ContextType>;
  meetings?: Resolver<Maybe<Array<Maybe<ResolversTypes['Meeting']>>>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MentorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mentor'] = ResolversParentTypes['Mentor']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  job_title_primary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  job_title_secondary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferred_services?: Resolver<Array<Maybe<ResolversTypes['Services']>>, ParentType, ContextType>;
  birthyear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  degree_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  highest_education?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  school_year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  years_experience?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  meetings?: Resolver<Maybe<Array<Maybe<ResolversTypes['Meeting']>>>, ParentType, ContextType>;
  availability?: Resolver<Maybe<Array<Maybe<ResolversTypes['Availability']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MentorWithScoreResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MentorWithScore'] = ResolversParentTypes['MentorWithScore']> = {
  mentor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  proposeMeeting?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationProposeMeetingArgs, 'input'>>;
  cancelMeeting?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCancelMeetingArgs, 'input'>>;
  createMeeting?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCreateMeetingArgs, 'input'>>;
};

export type Proposed_TimeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Proposed_Time'] = ResolversParentTypes['Proposed_Time']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  meeting_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userMentors?: Resolver<Maybe<Array<Maybe<ResolversTypes['MentorWithScore']>>>, ParentType, ContextType, RequireFields<QueryUserMentorsArgs, 'id'>>;
  universities?: Resolver<Maybe<Array<Maybe<ResolversTypes['University']>>>, ParentType, ContextType>;
  majors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Majors']>>>, ParentType, ContextType>;
  skills?: Resolver<Maybe<Array<Maybe<ResolversTypes['Skills']>>>, ParentType, ContextType>;
  languages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Language']>>>, ParentType, ContextType>;
  registerInputs?: Resolver<Maybe<ResolversTypes['RegisterInputs']>, ParentType, ContextType>;
};

export type RegisterInputsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegisterInputs'] = ResolversParentTypes['RegisterInputs']> = {
  language?: Resolver<Maybe<Array<Maybe<ResolversTypes['Language']>>>, ParentType, ContextType>;
  skills?: Resolver<Maybe<Array<Maybe<ResolversTypes['Skills']>>>, ParentType, ContextType>;
  university?: Resolver<Maybe<Array<Maybe<ResolversTypes['University']>>>, ParentType, ContextType>;
  majors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Majors']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Skills'] = ResolversParentTypes['Skills']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  family?: Resolver<ResolversTypes['Family'], ParentType, ContextType>;
  purpose?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  role?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  skill?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skill_type?: Resolver<ResolversTypes['Skill_Type'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UniversityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['University'] = ResolversParentTypes['University']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postgrad_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  province?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size_score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  undergrad_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  year_founded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mentee?: Resolver<Maybe<ResolversTypes['Mentee']>, ParentType, ContextType>;
  mentor?: Resolver<Maybe<ResolversTypes['Mentor']>, ParentType, ContextType>;
  language?: Resolver<Maybe<Array<Maybe<ResolversTypes['Language']>>>, ParentType, ContextType>;
  majors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Majors']>>>, ParentType, ContextType>;
  skills?: Resolver<Maybe<Array<Maybe<ResolversTypes['Skills']>>>, ParentType, ContextType>;
  university?: Resolver<Maybe<Array<Maybe<ResolversTypes['University']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Availability?: AvailabilityResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Language?: LanguageResolvers<ContextType>;
  Majors?: MajorsResolvers<ContextType>;
  Meeting?: MeetingResolvers<ContextType>;
  Mentee?: MenteeResolvers<ContextType>;
  Mentor?: MentorResolvers<ContextType>;
  MentorWithScore?: MentorWithScoreResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Proposed_Time?: Proposed_TimeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterInputs?: RegisterInputsResolvers<ContextType>;
  Skills?: SkillsResolvers<ContextType>;
  University?: UniversityResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
