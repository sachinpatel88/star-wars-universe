import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import MainApp from './main';
import get from 'lodash/get';
import './styles.less';

const cache = new InMemoryCache({
    addTypename: false
});

const link = new HttpLink({
    uri: get(process, 'env.GRAPHQL_SERVER_URL', 'http://localhost:4000/')
});

const client = new ApolloClient({
    cache,
    link
});

export default function App() {
    return (
        <ApolloProvider client={client}>
            <MainApp />
        </ApolloProvider>
    );
}
