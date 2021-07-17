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
};

export type Mentee = {
  __typename?: 'Mentee';
  name: Scalars['String'];
  job_title_primary: Scalars['String'];
  job_title_secondary?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  preferred_services: Array<Maybe<Services>>;
  school: Array<Maybe<Scalars['String']>>;
  school_major: Scalars['String'];
  degree_type?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  school_year?: Maybe<Scalars['Int']>;
};

export type Mentor = {
  __typename?: 'Mentor';
  name: Scalars['String'];
  job_title_primary: Scalars['String'];
  job_title_secondary?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  preferred_services: Array<Maybe<Services>>;
  school: Array<Maybe<Scalars['String']>>;
  school_major: Scalars['String'];
  degree_type?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  school_year?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  /** Find all mentors */
  Mentors?: Maybe<Array<Maybe<Mentor>>>;
  /** Find all mentees */
  Mentees?: Maybe<Array<Maybe<Mentor>>>;
  /** Find first mentors */
  Mentor?: Maybe<Mentor>;
  /** Find first mentee */
  Mentee?: Maybe<Mentee>;
};

export enum Services {
  CareerDevelopment = 'CAREER_DEVELOPMENT',
  General = 'GENERAL',
  MockInterview = 'MOCK_INTERVIEW',
  CareerPlanning = 'CAREER_PLANNING',
  SuccessAtWork = 'SUCCESS_AT_WORK',
  SkillsForSuccess = 'SKILLS_FOR_SUCCESS',
  WorkLifeBalance = 'WORK_LIFE_BALANCE',
  ResumeCritique = 'RESUME_CRITIQUE'
}

export type GetMentorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMentorsQuery = (
  { __typename?: 'Query' }
  & { Mentors?: Maybe<Array<Maybe<(
    { __typename?: 'Mentor' }
    & Pick<Mentor, 'name' | 'job_title_primary' | 'job_title_secondary' | 'bio' | 'preferred_services' | 'school' | 'school_major' | 'degree_type' | 'id' | 'school_year'>
  )>>> }
);

export type GetMenteesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenteesQuery = (
  { __typename?: 'Query' }
  & { Mentees?: Maybe<Array<Maybe<(
    { __typename?: 'Mentor' }
    & Pick<Mentor, 'name' | 'job_title_primary' | 'job_title_secondary' | 'bio' | 'preferred_services' | 'school' | 'school_major' | 'degree_type' | 'id' | 'school_year'>
  )>>> }
);

export type GetMentorQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMentorQuery = (
  { __typename?: 'Query' }
  & { Mentor?: Maybe<(
    { __typename?: 'Mentor' }
    & Pick<Mentor, 'name' | 'job_title_primary' | 'job_title_secondary' | 'bio' | 'preferred_services' | 'school' | 'school_major' | 'degree_type' | 'id' | 'school_year'>
  )> }
);

export type GetMenteeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenteeQuery = (
  { __typename?: 'Query' }
  & { Mentee?: Maybe<(
    { __typename?: 'Mentee' }
    & Pick<Mentee, 'name' | 'job_title_primary' | 'job_title_secondary' | 'bio' | 'preferred_services' | 'school' | 'school_major' | 'id' | 'degree_type' | 'school_year'>
  )> }
);


export const GetMentorsDocument = gql`
    query GetMentors {
  Mentors {
    name
    job_title_primary
    job_title_secondary
    bio
    preferred_services
    school
    school_major
    degree_type
    id
    school_year
  }
}
    `;

/**
 * __useGetMentorsQuery__
 *
 * To run a query within a React component, call `useGetMentorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMentorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMentorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMentorsQuery(baseOptions?: Apollo.QueryHookOptions<GetMentorsQuery, GetMentorsQueryVariables>) {
        return Apollo.useQuery<GetMentorsQuery, GetMentorsQueryVariables>(GetMentorsDocument, baseOptions);
      }
export function useGetMentorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMentorsQuery, GetMentorsQueryVariables>) {
          return Apollo.useLazyQuery<GetMentorsQuery, GetMentorsQueryVariables>(GetMentorsDocument, baseOptions);
        }
export type GetMentorsQueryHookResult = ReturnType<typeof useGetMentorsQuery>;
export type GetMentorsLazyQueryHookResult = ReturnType<typeof useGetMentorsLazyQuery>;
export type GetMentorsQueryResult = Apollo.QueryResult<GetMentorsQuery, GetMentorsQueryVariables>;
export const GetMenteesDocument = gql`
    query GetMentees {
  Mentees {
    name
    job_title_primary
    job_title_secondary
    bio
    preferred_services
    school
    school_major
    degree_type
    id
    school_year
  }
}
    `;

/**
 * __useGetMenteesQuery__
 *
 * To run a query within a React component, call `useGetMenteesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenteesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenteesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMenteesQuery(baseOptions?: Apollo.QueryHookOptions<GetMenteesQuery, GetMenteesQueryVariables>) {
        return Apollo.useQuery<GetMenteesQuery, GetMenteesQueryVariables>(GetMenteesDocument, baseOptions);
      }
export function useGetMenteesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMenteesQuery, GetMenteesQueryVariables>) {
          return Apollo.useLazyQuery<GetMenteesQuery, GetMenteesQueryVariables>(GetMenteesDocument, baseOptions);
        }
export type GetMenteesQueryHookResult = ReturnType<typeof useGetMenteesQuery>;
export type GetMenteesLazyQueryHookResult = ReturnType<typeof useGetMenteesLazyQuery>;
export type GetMenteesQueryResult = Apollo.QueryResult<GetMenteesQuery, GetMenteesQueryVariables>;
export const GetMentorDocument = gql`
    query GetMentor {
  Mentor {
    name
    job_title_primary
    job_title_secondary
    bio
    preferred_services
    school
    school_major
    degree_type
    id
    school_year
  }
}
    `;

/**
 * __useGetMentorQuery__
 *
 * To run a query within a React component, call `useGetMentorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMentorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMentorQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMentorQuery(baseOptions?: Apollo.QueryHookOptions<GetMentorQuery, GetMentorQueryVariables>) {
        return Apollo.useQuery<GetMentorQuery, GetMentorQueryVariables>(GetMentorDocument, baseOptions);
      }
export function useGetMentorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMentorQuery, GetMentorQueryVariables>) {
          return Apollo.useLazyQuery<GetMentorQuery, GetMentorQueryVariables>(GetMentorDocument, baseOptions);
        }
export type GetMentorQueryHookResult = ReturnType<typeof useGetMentorQuery>;
export type GetMentorLazyQueryHookResult = ReturnType<typeof useGetMentorLazyQuery>;
export type GetMentorQueryResult = Apollo.QueryResult<GetMentorQuery, GetMentorQueryVariables>;
export const GetMenteeDocument = gql`
    query GetMentee {
  Mentee {
    name
    job_title_primary
    job_title_secondary
    bio
    preferred_services
    school
    school_major
    id
    degree_type
    school_year
  }
}
    `;

/**
 * __useGetMenteeQuery__
 *
 * To run a query within a React component, call `useGetMenteeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenteeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenteeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMenteeQuery(baseOptions?: Apollo.QueryHookOptions<GetMenteeQuery, GetMenteeQueryVariables>) {
        return Apollo.useQuery<GetMenteeQuery, GetMenteeQueryVariables>(GetMenteeDocument, baseOptions);
      }
export function useGetMenteeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMenteeQuery, GetMenteeQueryVariables>) {
          return Apollo.useLazyQuery<GetMenteeQuery, GetMenteeQueryVariables>(GetMenteeDocument, baseOptions);
        }
export type GetMenteeQueryHookResult = ReturnType<typeof useGetMenteeQuery>;
export type GetMenteeLazyQueryHookResult = ReturnType<typeof useGetMenteeLazyQuery>;
export type GetMenteeQueryResult = Apollo.QueryResult<GetMenteeQuery, GetMenteeQueryVariables>;