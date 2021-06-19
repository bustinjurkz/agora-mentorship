import gql from 'graphql-tag';

gql`
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
