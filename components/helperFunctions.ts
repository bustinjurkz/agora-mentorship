import { createMuiTheme } from '@material-ui/core/styles';
import { Services } from 'generated/graphql';
import styled, { createGlobalStyle } from 'styled-components';

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

export const MuiTheme = createMuiTheme({
  typography: {
    fontFamily: `"Rubik",sans-serif;`,
  },
});

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
