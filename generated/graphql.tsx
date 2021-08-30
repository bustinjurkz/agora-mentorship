import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Availability = {
  __typename?: 'Availability';
  id: Scalars['ID'];
  time?: Maybe<Scalars['Date']>;
  mentorId: Scalars['ID'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreateMeetingInput = {
  topic: Services;
  proposed_times: Array<Scalars['Date']>;
  menteeId: Scalars['ID'];
  mentorId: Scalars['ID'];
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
  topic?: Maybe<Array<Maybe<Services>>>;
  start_time?: Maybe<Scalars['Date']>;
  end_time?: Maybe<Scalars['Date']>;
  cancelled?: Maybe<Scalars['Boolean']>;
  cancel_reason?: Maybe<Scalars['String']>;
  proposed_times: Array<Maybe<Proposed_Time>>;
  menteeId: Scalars['ID'];
  mentorId: Scalars['ID'];
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
  createMeeting?: Maybe<Scalars['ID']>;
};


export type MutationCreateMeetingArgs = {
  input: CreateMeetingInput;
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
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserMentorsArgs = {
  id: Scalars['ID'];
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

export type GetUserQueryVariables = Exact<{
  input: Scalars['ID'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
    & { language?: Maybe<Array<Maybe<(
      { __typename?: 'Language' }
      & Pick<Language, 'id' | 'language' | 'country' | 'population'>
    )>>>, mentor?: Maybe<(
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'id' | 'bio' | 'job_title_primary' | 'job_title_secondary' | 'preferred_services' | 'birthyear' | 'degree_type' | 'school_year' | 'highest_education' | 'name' | 'years_experience'>
      & { availability?: Maybe<Array<Maybe<(
        { __typename?: 'Availability' }
        & Pick<Availability, 'id' | 'time'>
      )>>>, meetings?: Maybe<Array<Maybe<(
        { __typename?: 'Meeting' }
        & Pick<Meeting, 'id' | 'start_time'>
      )>>> }
    )>, mentee?: Maybe<(
      { __typename?: 'Mentee' }
      & Pick<Mentee, 'id' | 'bio' | 'job_title_primary' | 'job_title_secondary' | 'preferred_services' | 'birthyear' | 'school_year' | 'degree_type' | 'highest_education' | 'name' | 'years_experience'>
    )>, majors?: Maybe<Array<Maybe<(
      { __typename?: 'Majors' }
      & Pick<Majors, 'id' | 'major' | 'faculty'>
    )>>>, skills?: Maybe<Array<Maybe<(
      { __typename?: 'Skills' }
      & Pick<Skills, 'id' | 'skill' | 'skill_type' | 'family' | 'role' | 'purpose'>
    )>>>, university?: Maybe<Array<Maybe<(
      { __typename?: 'University' }
      & Pick<University, 'id' | 'name' | 'city' | 'province' | 'country' | 'language' | 'category' | 'undergrad_count' | 'postgrad_count' | 'total_count' | 'year_founded' | 'size_score'>
    )>>> }
  )> }
);

export type GetUserMentorsQueryVariables = Exact<{
  input: Scalars['ID'];
}>;


export type GetUserMentorsQuery = (
  { __typename?: 'Query' }
  & { userMentors?: Maybe<Array<Maybe<(
    { __typename?: 'MentorWithScore' }
    & Pick<MentorWithScore, 'score'>
    & { mentor?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
      & { language?: Maybe<Array<Maybe<(
        { __typename?: 'Language' }
        & Pick<Language, 'id' | 'language' | 'country' | 'population'>
      )>>>, mentor?: Maybe<(
        { __typename?: 'Mentor' }
        & Pick<Mentor, 'id' | 'bio' | 'job_title_primary' | 'job_title_secondary' | 'preferred_services' | 'birthyear' | 'degree_type' | 'highest_education' | 'name' | 'years_experience'>
        & { availability?: Maybe<Array<Maybe<(
          { __typename?: 'Availability' }
          & Pick<Availability, 'id' | 'time'>
        )>>>, meetings?: Maybe<Array<Maybe<(
          { __typename?: 'Meeting' }
          & Pick<Meeting, 'id' | 'start_time'>
        )>>> }
      )>, majors?: Maybe<Array<Maybe<(
        { __typename?: 'Majors' }
        & Pick<Majors, 'id' | 'major' | 'faculty'>
      )>>>, skills?: Maybe<Array<Maybe<(
        { __typename?: 'Skills' }
        & Pick<Skills, 'id' | 'skill' | 'skill_type' | 'family' | 'role' | 'purpose'>
      )>>>, university?: Maybe<Array<Maybe<(
        { __typename?: 'University' }
        & Pick<University, 'id' | 'name' | 'city' | 'province' | 'country' | 'language' | 'category' | 'undergrad_count' | 'postgrad_count' | 'total_count' | 'year_founded' | 'size_score'>
      )>>> }
    )> }
  )>>> }
);


export const GetUserDocument = gql`
    query GetUser($input: ID!) {
  user(id: $input) {
    id
    email
    language {
      id
      language
      country
      population
    }
    mentor {
      id
      bio
      job_title_primary
      job_title_secondary
      preferred_services
      birthyear
      degree_type
      school_year
      highest_education
      name
      years_experience
      availability {
        id
        time
      }
      meetings {
        id
        start_time
      }
    }
    mentee {
      id
      bio
      job_title_primary
      job_title_secondary
      preferred_services
      birthyear
      school_year
      degree_type
      highest_education
      name
      years_experience
    }
    majors {
      id
      major
      faculty
    }
    skills {
      id
      skill
      skill_type
      family
      role
      purpose
    }
    university {
      id
      name
      city
      province
      country
      language
      category
      undergrad_count
      postgrad_count
      total_count
      year_founded
      size_score
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUserMentorsDocument = gql`
    query GetUserMentors($input: ID!) {
  userMentors(id: $input) {
    mentor {
      id
      email
      language {
        id
        language
        country
        population
      }
      mentor {
        id
        bio
        job_title_primary
        job_title_secondary
        preferred_services
        birthyear
        degree_type
        highest_education
        name
        years_experience
        availability {
          id
          time
        }
        meetings {
          id
          start_time
        }
      }
      majors {
        id
        major
        faculty
      }
      skills {
        id
        skill
        skill_type
        family
        role
        purpose
      }
      university {
        id
        name
        city
        province
        country
        language
        category
        undergrad_count
        postgrad_count
        total_count
        year_founded
        size_score
      }
    }
    score
  }
}
    `;

/**
 * __useGetUserMentorsQuery__
 *
 * To run a query within a React component, call `useGetUserMentorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserMentorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserMentorsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserMentorsQuery(baseOptions: Apollo.QueryHookOptions<GetUserMentorsQuery, GetUserMentorsQueryVariables>) {
        return Apollo.useQuery<GetUserMentorsQuery, GetUserMentorsQueryVariables>(GetUserMentorsDocument, baseOptions);
      }
export function useGetUserMentorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserMentorsQuery, GetUserMentorsQueryVariables>) {
          return Apollo.useLazyQuery<GetUserMentorsQuery, GetUserMentorsQueryVariables>(GetUserMentorsDocument, baseOptions);
        }
export type GetUserMentorsQueryHookResult = ReturnType<typeof useGetUserMentorsQuery>;
export type GetUserMentorsLazyQueryHookResult = ReturnType<typeof useGetUserMentorsLazyQuery>;
export type GetUserMentorsQueryResult = Apollo.QueryResult<GetUserMentorsQuery, GetUserMentorsQueryVariables>;