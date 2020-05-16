import React from 'react';
import './App.css';

import { useMutation, useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
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

const DELETE_USER = gql`
    mutation DeleteMutation($selected: ID!) {
      deleteUser(id: $selected) {
        id
        name
        email
      }
    }
  `

function App() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <UserTable users={data.users} deleteUser={deleteUser} />;
}

export default App;