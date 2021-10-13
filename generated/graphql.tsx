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

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  mentee?: Maybe<MenteeRegister>;
  mentor?: Maybe<MentorRegister>;
  language: Array<Scalars['String']>;
  skills: Array<Scalars['String']>;
  university: Array<Scalars['String']>;
  majors: Array<Scalars['String']>;
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

export type MenteeRegister = {
  bio?: Maybe<Scalars['String']>;
  job_title_primary?: Maybe<Scalars['String']>;
  job_title_secondary?: Maybe<Scalars['String']>;
  preferred_services: Array<Maybe<Services>>;
  birthyear: Scalars['Int'];
  degree_type?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  school_year?: Maybe<Scalars['Int']>;
  years_experience: Scalars['Int'];
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

export type MentorRegister = {
  bio?: Maybe<Scalars['String']>;
  job_title_primary: Scalars['String'];
  job_title_secondary?: Maybe<Scalars['String']>;
  preferred_services: Array<Maybe<Services>>;
  birthyear: Scalars['Int'];
  degree_type?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  school_year?: Maybe<Scalars['Int']>;
  years_experience: Scalars['Int'];
  availability: Array<Scalars['Date']>;
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
  /** Creates a user in the registration process */
  createUser?: Maybe<Scalars['Boolean']>;
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


export type MutationCreateUserArgs = {
  input: CreateUserInput;
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

export type ProposeMeetingMutationVariables = Exact<{
  input: ProposeMeetingInput;
}>;


export type ProposeMeetingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'proposeMeeting'>
);

export type CreateMeetingMutationVariables = Exact<{
  input: CreateMeetingInput;
}>;


export type CreateMeetingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createMeeting'>
);

export type CancelMeetingMutationVariables = Exact<{
  input: CancelMeetingInput;
}>;


export type CancelMeetingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cancelMeeting'>
);

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createUser'>
);

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
        & Pick<Meeting, 'id' | 'start_time' | 'end_time' | 'cancelled' | 'topic'>
        & { proposed_times?: Maybe<Array<Maybe<(
          { __typename?: 'Proposed_Time' }
          & Pick<Proposed_Time, 'id' | 'meeting_id' | 'time'>
        )>>>, mentee?: Maybe<(
          { __typename?: 'Mentee' }
          & Pick<Mentee, 'id' | 'userId' | 'name' | 'job_title_primary' | 'job_title_secondary'>
        )> }
      )>>> }
    )>, mentee?: Maybe<(
      { __typename?: 'Mentee' }
      & Pick<Mentee, 'id' | 'bio' | 'job_title_primary' | 'job_title_secondary' | 'preferred_services' | 'birthyear' | 'school_year' | 'degree_type' | 'highest_education' | 'name' | 'years_experience'>
      & { meetings?: Maybe<Array<Maybe<(
        { __typename?: 'Meeting' }
        & Pick<Meeting, 'id' | 'start_time' | 'end_time' | 'cancelled' | 'topic'>
        & { proposed_times?: Maybe<Array<Maybe<(
          { __typename?: 'Proposed_Time' }
          & Pick<Proposed_Time, 'id' | 'meeting_id' | 'time'>
        )>>>, mentor?: Maybe<(
          { __typename?: 'Mentor' }
          & Pick<Mentor, 'id' | 'name' | 'job_title_primary' | 'job_title_secondary'>
        )> }
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

export type GetRegisterInputsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRegisterInputsQuery = (
  { __typename?: 'Query' }
  & { registerInputs?: Maybe<(
    { __typename?: 'RegisterInputs' }
    & { language?: Maybe<Array<Maybe<(
      { __typename?: 'Language' }
      & Pick<Language, 'id' | 'language'>
    )>>>, majors?: Maybe<Array<Maybe<(
      { __typename?: 'Majors' }
      & Pick<Majors, 'id' | 'major'>
    )>>>, skills?: Maybe<Array<Maybe<(
      { __typename?: 'Skills' }
      & Pick<Skills, 'id' | 'skill'>
    )>>>, university?: Maybe<Array<Maybe<(
      { __typename?: 'University' }
      & Pick<University, 'id' | 'name'>
    )>>> }
  )> }
);


export const ProposeMeetingDocument = gql`
    mutation ProposeMeeting($input: ProposeMeetingInput!) {
  proposeMeeting(input: $input)
}
    `;
export type ProposeMeetingMutationFn = Apollo.MutationFunction<ProposeMeetingMutation, ProposeMeetingMutationVariables>;

/**
 * __useProposeMeetingMutation__
 *
 * To run a mutation, you first call `useProposeMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProposeMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [proposeMeetingMutation, { data, loading, error }] = useProposeMeetingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProposeMeetingMutation(baseOptions?: Apollo.MutationHookOptions<ProposeMeetingMutation, ProposeMeetingMutationVariables>) {
        return Apollo.useMutation<ProposeMeetingMutation, ProposeMeetingMutationVariables>(ProposeMeetingDocument, baseOptions);
      }
export type ProposeMeetingMutationHookResult = ReturnType<typeof useProposeMeetingMutation>;
export type ProposeMeetingMutationResult = Apollo.MutationResult<ProposeMeetingMutation>;
export type ProposeMeetingMutationOptions = Apollo.BaseMutationOptions<ProposeMeetingMutation, ProposeMeetingMutationVariables>;
export const CreateMeetingDocument = gql`
    mutation CreateMeeting($input: CreateMeetingInput!) {
  createMeeting(input: $input)
}
    `;
export type CreateMeetingMutationFn = Apollo.MutationFunction<CreateMeetingMutation, CreateMeetingMutationVariables>;

/**
 * __useCreateMeetingMutation__
 *
 * To run a mutation, you first call `useCreateMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMeetingMutation, { data, loading, error }] = useCreateMeetingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMeetingMutation(baseOptions?: Apollo.MutationHookOptions<CreateMeetingMutation, CreateMeetingMutationVariables>) {
        return Apollo.useMutation<CreateMeetingMutation, CreateMeetingMutationVariables>(CreateMeetingDocument, baseOptions);
      }
export type CreateMeetingMutationHookResult = ReturnType<typeof useCreateMeetingMutation>;
export type CreateMeetingMutationResult = Apollo.MutationResult<CreateMeetingMutation>;
export type CreateMeetingMutationOptions = Apollo.BaseMutationOptions<CreateMeetingMutation, CreateMeetingMutationVariables>;
export const CancelMeetingDocument = gql`
    mutation CancelMeeting($input: CancelMeetingInput!) {
  cancelMeeting(input: $input)
}
    `;
export type CancelMeetingMutationFn = Apollo.MutationFunction<CancelMeetingMutation, CancelMeetingMutationVariables>;

/**
 * __useCancelMeetingMutation__
 *
 * To run a mutation, you first call `useCancelMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelMeetingMutation, { data, loading, error }] = useCancelMeetingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelMeetingMutation(baseOptions?: Apollo.MutationHookOptions<CancelMeetingMutation, CancelMeetingMutationVariables>) {
        return Apollo.useMutation<CancelMeetingMutation, CancelMeetingMutationVariables>(CancelMeetingDocument, baseOptions);
      }
export type CancelMeetingMutationHookResult = ReturnType<typeof useCancelMeetingMutation>;
export type CancelMeetingMutationResult = Apollo.MutationResult<CancelMeetingMutation>;
export type CancelMeetingMutationOptions = Apollo.BaseMutationOptions<CancelMeetingMutation, CancelMeetingMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
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
        end_time
        cancelled
        proposed_times {
          id
          meeting_id
          time
        }
        topic
        mentee {
          id
          userId
          name
          job_title_primary
          job_title_secondary
        }
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
      meetings {
        id
        start_time
        end_time
        cancelled
        proposed_times {
          id
          meeting_id
          time
        }
        topic
        mentor {
          id
          name
          job_title_primary
          job_title_secondary
        }
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
export const GetRegisterInputsDocument = gql`
    query GetRegisterInputs {
  registerInputs {
    language {
      id
      language
    }
    majors {
      id
      major
    }
    skills {
      id
      skill
    }
    university {
      id
      name
    }
  }
}
    `;

/**
 * __useGetRegisterInputsQuery__
 *
 * To run a query within a React component, call `useGetRegisterInputsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRegisterInputsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRegisterInputsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRegisterInputsQuery(baseOptions?: Apollo.QueryHookOptions<GetRegisterInputsQuery, GetRegisterInputsQueryVariables>) {
        return Apollo.useQuery<GetRegisterInputsQuery, GetRegisterInputsQueryVariables>(GetRegisterInputsDocument, baseOptions);
      }
export function useGetRegisterInputsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRegisterInputsQuery, GetRegisterInputsQueryVariables>) {
          return Apollo.useLazyQuery<GetRegisterInputsQuery, GetRegisterInputsQueryVariables>(GetRegisterInputsDocument, baseOptions);
        }
export type GetRegisterInputsQueryHookResult = ReturnType<typeof useGetRegisterInputsQuery>;
export type GetRegisterInputsLazyQueryHookResult = ReturnType<typeof useGetRegisterInputsLazyQuery>;
export type GetRegisterInputsQueryResult = Apollo.QueryResult<GetRegisterInputsQuery, GetRegisterInputsQueryVariables>;