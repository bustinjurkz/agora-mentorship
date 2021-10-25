import { createTheme } from '@mui/material/styles';
import { Services } from '../api/generated/graphql';
import styled, { createGlobalStyle } from 'styled-components';
import Fuse from 'fuse.js';
import Swal from 'sweetalert2';

export const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    background-color: #f9f9f9;
    font-family: 'Rubik', sans-serif;
    margin: 0;
    color: #1a5336;
    padding: 0;
    overflow: hidden;
    box-sizing: border-box;
  }
  .MuiButton-outlined{
    border: 3px solid #ffaf40 !important
  }
  .MuiCircularProgress-colorPrimary{
      color: #1a5336 !important
  }


`;

export const theme = {
  white: '#f9f9f9',
  mainGreen: '#1a5336',
  TDGreen: '#008a00',
  orange: '#ff9500',
  lightGreen: '#f5f9f7',
  grey: '#cacaca',
  lightGrey: '#b3b3b3',
};

export const MuiTheme = createTheme({
  typography: {
    fontFamily: `"Rubik",sans-serif;`,
  },
});

export const parseDate = (selectedDate: Date, hour: number) => {
  const adjustedHourDate = new Date(selectedDate.setHours(hour, 0));
  return adjustedHourDate;
};

export const servicePrettier = (service: Services) => {
  let prettyService;
  switch (service) {
    case Services.CareerDevelopment:
      return (prettyService = 'Career Development');
    case Services.CareerPlanning:
      return (prettyService = 'Career Planning');
    case Services.General:
      return (prettyService = 'General');
    case Services.MockInterview:
      return (prettyService = 'Mock Interview');
    case Services.ResumeCritique:
      return (prettyService = 'Resume/CV Critique');
    case Services.SkillsForSuccess:
      return (prettyService = 'Skills for Success');
    case Services.SuccessAtWork:
      return (prettyService = 'Success at Work');
    case Services.WorkLifeBalance:
      return (prettyService = 'Work-Life Balance');
    default:
      return prettyService;
  }
};

export type DegreeType =
  | 'College Diploma'
  | 'Bachelors (3 years)'
  | 'Honours (4 years)'
  | 'Masters'
  | 'Professional Degree'
  | 'PhD';

export const degrees: DegreeType[] = [
  'College Diploma',
  'Bachelors (3 years)',
  'Honours (4 years)',
  'Masters',
  'Professional Degree',
  'PhD',
];

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const majorPrettier = (major: string) => {
  const newMajor = major.toLowerCase().replace(/_/g, ' ');
  return newMajor.split(' ').map(capitalize).join(' ').replace(/And/, 'and');
};

export const getHighestEducation = (degree: DegreeType) => {
  switch (degree) {
    case 'College Diploma':
      return 1;
    case 'Bachelors (3 years)':
      return 2;
    case 'Honours (4 years)':
      return 3;
    case 'Masters':
      return 4;
    case 'Professional Degree':
      return 5;
    case 'PhD':
      return 6;
  }
};

export const services = [
  Services.CareerDevelopment,
  Services.CareerPlanning,
  Services.General,
  Services.MockInterview,
  Services.ResumeCritique,
  Services.SkillsForSuccess,
  Services.SuccessAtWork,
  Services.WorkLifeBalance,
];

export const BackgroundStyle = styled.div<{
  backgroundColor?: string;
  fullHeight?: boolean;
}>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : '#fff'};
  padding: 10px;
  box-shadow: 2px 3px 3px 1px #dbdbdb;
  height: ${(props) => props.fullHeight && '100%'};
`;

export function applySearchQuery<T>(data: T[], query: string): T[] {
  if (query === '') return data;

  //TODO append more specific search variables
  const fuse = new Fuse(data, {
    keys: ['mentor.mentor.name', 'mentor.university.name'],
    threshold: 0.3,
    shouldSort: true,
  });
  return fuse.search(query.trim().substring(0, 32)).map((x) => x.item);
}

export type UserType = 'mentee' | 'mentor' | 'hr';

export type MeetingType = 'past' | 'upcoming' | 'pending';

export function renderAlert(
  msg: string,
  type: 'success' | 'error',
  title?: string,
) {
  Swal.fire({
    icon: type === 'error' ? 'error' : 'success',
    title: title ? title : type === 'error' ? 'Oh no!' : 'Nice one!',
    text: msg,
  });
}
