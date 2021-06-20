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

export type Mentor = {
  __typename?: 'Mentor';
  name: Scalars['String'];
  job_title_primary: Scalars['String'];
  job_title_secondary?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  preferred_services: Array<Maybe<Services>>;
  school: Array<Maybe<Scalars['String']>>;
  school_major: Scalars['String'];
  id: Scalars['Int'];
  school_year?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  Mentor?: Maybe<Mentor>;
};

export enum Services {
  CareerDevelopment = 'CAREER_DEVELOPMENT',
  General = 'GENERAL',
  MockInterview = 'MOCK_INTERVIEW',
  CareerPlanning = 'CAREER_PLANNING',
  SuccessAtWork = 'SUCCESS_AT_WORK'
}

export type GetMentorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMentorsQuery = (
  { __typename?: 'Query' }
  & { Mentor?: Maybe<(
    { __typename?: 'Mentor' }
    & Pick<Mentor, 'name' | 'job_title_primary' | 'job_title_secondary' | 'bio' | 'preferred_services' | 'school' | 'school_major' | 'id' | 'school_year'>
  )> }
);


export const GetMentorsDocument = gql`
    query GetMentors {
  Mentor {
    name
    job_title_primary
    job_title_secondary
    bio
    preferred_services
    school
    school_major
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