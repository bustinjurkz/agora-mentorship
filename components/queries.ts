import gql from 'graphql-tag';

gql`
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

gql`
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

gql`
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

gql`
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
