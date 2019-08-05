import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist';

//const graphqlLink = 'https://training.yireo.com/graphql';
const graphqlLink = 'http://training.yireo.comdev/graphql';

const httpLink = new HttpLink({
  uri: graphqlLink
})

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage
});

const client = new ApolloClient({
  link: httpLink,
  cache: cache
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root')
)

serviceWorker.unregister();
