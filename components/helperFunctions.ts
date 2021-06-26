import { createMuiTheme } from '@material-ui/core/styles';
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
  orange: '#ffaf40',
  lightGreen: '#f5f9f7',
  grey: '#cacaca',
};

export const MuiTheme = createMuiTheme({
  typography: {
    fontFamily: `"Rubik",sans-serif;`,
  },
});

export const BackgroundStyle = styled.div<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : '#fff'};
  padding: 10px;
  box-shadow: 2px 3px 3px 0px #e7e7e7;
`;
