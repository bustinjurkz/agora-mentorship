import { createGlobalStyle, ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import { Helmet } from 'react-helmet';
import { ApolloProvider } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store/store';
import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { client } from '../client';

const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    background-color: #f7faf6;
    font-family: 'Rubik', sans-serif;

    margin: 0;
    color: #415939;
    padding: 0;
    overflow: hidden;
    box-sizing: border-box;
  }

`;

const theme = {
  primary: '#0070f3',
  white: '#f6faf6',
  lightestGreen: '#f7faf6',
  lightGreen: '#e9f0e7',
  green: '#73a85f',
  darkGreen: '#415939',
  treeGreen: '#c9d3c5',
  grey: '#b4b5b4',
  brown: '#48302F',
  paleGreen: '#C1CCBD',
};

const MuiTheme = createMuiTheme({
  typography: {
    fontFamily: `"Rubik",sans-serif;`,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <MuiThemeProvider theme={MuiTheme}>
        <ThemeProvider theme={theme}>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Agora</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="icon" href="/favicon.ico" />
            <link
              href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
              rel="stylesheet"
            />
          </Helmet>

          <ReduxProvider store={store}>
            <ApolloProvider client={client}>
              {/* <Navbar />
              <Layout> */}
              <Component {...pageProps} />
              {/* <Footer />
              </Layout> */}
            </ApolloProvider>
          </ReduxProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
}
