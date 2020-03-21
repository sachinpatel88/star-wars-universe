import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PeopleList from './people';
import PeopleDetails from './details';
import './styles.less';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import MainApp from './main';

const cache = new InMemoryCache({
    addTypename: false
});

const link = new HttpLink({
    uri: 'http://localhost:4000/'
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
