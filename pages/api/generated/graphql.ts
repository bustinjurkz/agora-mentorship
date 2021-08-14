import { GraphQLResolveInfo } from 'graphql';
import { User as UserModel, University as UniversityModel, Majors as MajorsModel, Skills as SkillsModel, Language as LanguageModel } from '@db/client';
import { Context } from '@api/context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
  years_experience: Scalars['Int'];
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
  name: Scalars['String'];
  years_experience: Scalars['Int'];
  userId?: Maybe<Scalars['ID']>;
  score?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  /** Find all majors */
  Majors?: Maybe<Majors>;
  /** Find first mentee */
  Mentee?: Maybe<Mentee>;
  /** Find first mentor */
  Mentor?: Maybe<Mentor>;
  /** Fetch all Skills data */
  Skills?: Maybe<Skills>;
  /** Fetch all University data */
  Universities?: Maybe<Array<Maybe<University>>>;
  /** Find all mentees */
  mentees?: Maybe<Array<Maybe<Mentee>>>;
  /** Find all mentors */
  mentors?: Maybe<Array<Maybe<Mentor>>>;
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
  Family: Family;
  Language: ResolverTypeWrapper<LanguageModel>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Majors: ResolverTypeWrapper<MajorsModel>;
  Mentee: ResolverTypeWrapper<Mentee>;
  Mentor: ResolverTypeWrapper<Mentor>;
  Query: ResolverTypeWrapper<{}>;
  Services: Services;
  Skill_Type: Skill_Type;
  Skills: ResolverTypeWrapper<SkillsModel>;
  University: ResolverTypeWrapper<UniversityModel>;
  User: ResolverTypeWrapper<UserModel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Language: LanguageModel;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Int: Scalars['Int'];
  Majors: MajorsModel;
  Mentee: Mentee;
  Mentor: Mentor;
  Query: {};
  Skills: SkillsModel;
  University: UniversityModel;
  User: UserModel;
  Boolean: Scalars['Boolean'];
};

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
  years_experience?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  years_experience?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  Majors?: Resolver<Maybe<ResolversTypes['Majors']>, ParentType, ContextType>;
  Mentee?: Resolver<Maybe<ResolversTypes['Mentee']>, ParentType, ContextType>;
  Mentor?: Resolver<Maybe<ResolversTypes['Mentor']>, ParentType, ContextType>;
  Skills?: Resolver<Maybe<ResolversTypes['Skills']>, ParentType, ContextType>;
  Universities?: Resolver<Maybe<Array<Maybe<ResolversTypes['University']>>>, ParentType, ContextType>;
  mentees?: Resolver<Maybe<Array<Maybe<ResolversTypes['Mentee']>>>, ParentType, ContextType>;
  mentors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Mentor']>>>, ParentType, ContextType>;
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
  Language?: LanguageResolvers<ContextType>;
  Majors?: MajorsResolvers<ContextType>;
  Mentee?: MenteeResolvers<ContextType>;
  Mentor?: MentorResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Skills?: SkillsResolvers<ContextType>;
  University?: UniversityResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
