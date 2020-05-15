import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
//import UserList from './components/UserList';
import UserTable from './components/UserTable';

const GET_USERS = gql`
  query {
    users(limit: 0) {
      id
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

        return <UserTable users={data.users} />;
      }}
    </Query>
  );
}

export default App;
