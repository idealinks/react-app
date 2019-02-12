import '../styles/empty.css';
import '../styles/base.css';
import '../styles/globals.css';
import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withApollo from '../app/apollo/withApollo';

/**
 * This _app.js syntax is a pattern to override Next.js default App component.
 * see https://nextjs.org/docs/#custom-app
 */
class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
