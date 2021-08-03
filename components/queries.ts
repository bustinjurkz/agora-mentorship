import gql from 'graphql-tag';

gql`
  query User($input: ID!) {
    user(id: $input) {
      id
      email
      password
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
        school_year
      }
      mentee {
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
        school_year
      }
      majors {
        id
        major
        faculty
      }
      skills {
        id
        skills
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
        underground_count
        postgrad_count
        total_count
        year_founded
        size_score
      }
    }
  }
`;

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
