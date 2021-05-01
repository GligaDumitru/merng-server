import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';
import { AuthContext } from '../context/auth';
const Register = (props) => {
  const context = useContext(AuthContext);
  const initialState = {
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
  };
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(registerUser, initialState);
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      localStorage.setItem('tokenDummyApolloClient', userData.token);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className='ui container text'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label={!!errors.username ? errors.username : 'username'}
          placeholder='Username here'
          name='username'
          value={values.username}
          onChange={onChange}
          error={!!errors.username}
        />
        <Form.Input
          type='email'
          label={!!errors.email ? errors.email : 'Email'}
          placeholder='Email here'
          name='email'
          value={values.email}
          onChange={onChange}
          error={!!errors.email}
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
        <Form.Input
          type='password'
          label={
            !!errors.confirmPassword
              ? errors.confirmPassword
              : 'ConfirmPassword'
          }
          error={!!errors.confirmPassword}
          placeholder='ConfirmPassword here'
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      </Form>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
