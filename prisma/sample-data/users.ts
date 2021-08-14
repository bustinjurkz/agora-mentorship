// languages
import { Services } from '.prisma/client';

export const users = [
  {
    email: 'dustinjurkaulionis@gmail.com',
    password: '1111',
    mentee: {
      name: 'Dustin Jurkaulionis',
      bio: 'Computer scientist specializing in the frontend of web',
      job_title_primary: 'Computer Scientist',
      job_title_secondary: 'Web Developer',
      preferred_services: [
        Services.RESUME_CRITIQUE,
        Services.SKILLS_FOR_SUCCESS,
      ],
      school_year: 2017,
      years_experience: 3,
      highest_education: 4,
      birthyear: 1991,
      degree_type: 'B.SC',
    },
    skills: ['JavaScript', 'Java', 'Node.js'],
    university: ['McMaster University'],
    majors: ['COMPUTER_SCIENCE', 'CHEMICAL_ENGINEERING'],
    language: ['French', 'English'],
  },
  {
    email: 'jesse222@gmail.com',
    password: '2222',
    mentor: {
      name: 'Jesse Drummond',
      bio: 'Computer scientist specializing in human behavior',
      job_title_primary: 'Human Behavior UX',
      job_title_secondary: 'Web Developer',
      preferred_services: [
        Services.RESUME_CRITIQUE,
        Services.SKILLS_FOR_SUCCESS,
      ],
      school_year: 2017,
      years_experience: 3,
      birthyear: 1993,
      highest_education: 4,
      degree_type: 'B.SC',
    },
    skills: ['Leadership', 'Market Research', 'Problem-solving'],
    university: ['Université de Montréal'],
    majors: ['HUMAN_BEHAVIOUR'],
    language: ['Bengali', 'Mandarin'],
  },
  {
    email: 'atinderbharaj@gmail.com',
    password: '3333',
    skills: ['Objective-C', 'NoSQL', 'Node.js'],
    mentor: {
      name: 'Atinder Bharaj',
      bio: 'Data scientist and a very good one!',
      job_title_primary: 'Data Scientist',
      preferred_services: [
        Services.RESUME_CRITIQUE,
        Services.SKILLS_FOR_SUCCESS,
      ],
      school_year: 2017,
      birthyear: 1993,
      years_experience: 3,
      highest_education: 4,
      degree_type: 'B.SC',
    },
    university: ['McMaster University'],
    majors: ['MATHEMATICS_AND_STATISTICS'],
    language: ['English', 'Spanish'],
  },
];
