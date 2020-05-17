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

const ADD_USER = gql`
  mutation AddMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateMutation($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`

const DELETE_USER = gql`
    mutation DeleteMutation($id: ID!) {
      deleteUser(id: $id) {
        id
      }
    }
  `

function App() {
  const { loading, error, data } = useQuery(GET_USERS);

  const [addUser] = useMutation(
    ADD_USER,
    {
      update: (cache: any, { data: { createUser } }: any) => {
        const { users } = cache.readQuery({ query: GET_USERS });
        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: users.concat([createUser]),
          },
        })
      }
    }
  );

  const [updateUser] = useMutation(
    UPDATE_USER,
    {
      update: (cache: any, { data: { updateUser } }: any) => {
        const { users } = cache.readQuery({ query: GET_USERS });
        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: users.map((obj: any) => {
              if (obj.id === updateUser.id) {
                obj = updateUser;
              }
              return obj;
            })
          },
        })
      }
    }
  );

  const [deleteUser] = useMutation(
    DELETE_USER,
    {
      update: (cache: any, { data: { deleteUser } }: any) => {
        const { users } = cache.readQuery({ query: GET_USERS });
        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: users.filter((obj: any) => {
              return obj.id !== deleteUser.id;
            })
          },
        })
      }
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <UserTable users={data.users} addUser={addUser} updateUser={updateUser} deleteUser={deleteUser} />;
}

export default App;