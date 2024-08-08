import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';

import theme from './theme.js';
import {ChakraProvider} from '@chakra-ui/react';

const httpLink = createHttpLink({
  // uri: 'http://127.0.0.1:3002'
  // uri: 'http://localhost:3002'
  uri: 'http://localhost:3002/graphql'
  // uri: '0.0.0.0:3002'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
