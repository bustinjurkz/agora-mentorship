import { createGlobalStyle, ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import { Helmet } from 'react-helmet';
import { ApolloProvider } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store/store';
import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { client } from '../client';
import Navbar from 'components/Navbar';
import Layout from 'components/Layout';
import Footer from 'components/Footer';
const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    background-color: #fdfdfd;
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


`;
const theme = {
  white: '#fdfdfd',
  mainGreen: '#1a5336',
  TDGreen: '#008a00',
  orange: '#ffaf40',
  lightGreen: '#f5f9f7',
  grey: '#cacaca',
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
            <title>Agora Mentorship</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="icon" href="/favicon.ico" />
            <link
              href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
              rel="stylesheet"
            />
          </Helmet>

          <ReduxProvider store={store}>
            <ApolloProvider client={client}>
              <Navbar />
              <Layout>
                <Component {...pageProps} />
                <Footer />
              </Layout>
            </ApolloProvider>
          </ReduxProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
}
