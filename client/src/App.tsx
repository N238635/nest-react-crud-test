import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { User } from './user';

const GET_USERS = gql`
  query {
    user(id: "5eb2ed281f62952c0810f1e0") {
      name
      email
    }
  }
`

function App() {
  return (
    <Query query={GET_USERS}>
      {(result: any) => {
        const { loading, error, data } = result;

        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :(</div>;

        return <User name={data.user.name} email={data.user.email} />;
      }}
    </Query>
  );
}

export default App;
