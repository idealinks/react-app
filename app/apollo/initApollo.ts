import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  defaultDataIdFromObject
} from 'apollo-boost';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';
import { customDataIdFromObject } from './apolloCacheUtils';

let apolloClient = null;

const { publicRuntimeConfig } = getConfig();

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  (global as any).fetch = fetch;
}

function create(initialState) {
  const link = createPersistedQueryLink({
    useGETForHashedQueries: true
  }).concat(new HttpLink({ uri: publicRuntimeConfig.graphqlApiEndpoint }));
  const cache = new InMemoryCache({
    dataIdFromObject: customDataIdFromObject(defaultDataIdFromObject)
  }).restore(initialState || {});

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache
  });
}

export default function initApollo(initialState = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
