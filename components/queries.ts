import gql from 'graphql-tag';

gql`
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

gql`
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
