import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { User } from './components/User';

const GET_USERS = gql`
  query {
    users {
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

        return (
          <ul>
            {data.users.map((user: any) => (
              <li><User name={user.name} email={user.email} /></li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
}

export default App;
