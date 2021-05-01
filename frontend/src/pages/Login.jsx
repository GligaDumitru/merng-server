import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

const Login = (props) => {
  const context = useContext(AuthContext);
  const initialState = {
    username: '',
    password: '',
  };
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginUser, initialState);
  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      localStorage.setItem('tokenDummyApolloClient', userData.token);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUser() {
    addUser();
  }

  return (
    <div className='ui container text'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label={!!errors.username ? errors.username : 'username'}
          placeholder='Username here'
          name='username'
          value={values.username}
          onChange={onChange}
          error={!!errors.username}
        />

        <Form.Input
          type='password'
          label={!!errors.password ? errors.password : 'Password'}
          error={!!errors.password}
          placeholder='Password here'
          name='password'
          value={values.password}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).some((error) => error === 'general') && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.keys(errors).map((error, index) => {
              if (error === 'general') {
                return <li key={error}>{Object.values(errors)[index]}</li>;
              }
              return null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
