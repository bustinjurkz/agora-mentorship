import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import { Helmet } from 'react-helmet';
import { ApolloProvider } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store/store';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { client } from '../client';
import Navbar from 'components/Navbar';
import Layout from 'components/Layout';
import Footer from 'components/Footer';
import { GlobalStyle, MuiTheme, theme } from 'components/helperFunctions';

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
