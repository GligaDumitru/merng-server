import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from './../util/graphql';

const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(callbackOn, { body: '' });
  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    variables: values,

    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      values.body = '';
    },
  });

  function callbackOn() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <Form.TextArea
          label={'Description'}
          placeholder='Description here'
          name='body'
          value={values.body}
          onChange={onChange}
        />

        <Button type='submit' primary>
          Create Post
        </Button>
      </Form>
      {error && (
        <div className='ui error message'>
          <ul className='list'>
            <li>{error.graphQLErrors[0].message}</li>;
          </ul>
        </div>
      )}
    </>
  );
};

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likesCount
      likes {
        username
      }
      commentsCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default PostForm;
