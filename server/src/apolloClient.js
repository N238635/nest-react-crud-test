import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'https://localhost:3000/graphql' });

const ApolloApp = AppComponent => (
    <ApolloProvider client={client} >
        <AppComponent />
    </ApolloProvider>
);

render(ApolloApp(App), document.getElementById('root'));