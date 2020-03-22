import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import MainApp from './main';
import './styles.less';

const cache = new InMemoryCache({
    addTypename: false
});

const link = new HttpLink({
    uri: GRAPHQL_SERVER_URL
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
