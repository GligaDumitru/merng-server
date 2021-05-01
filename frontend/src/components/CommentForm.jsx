import { useMutation } from '@apollo/react-hooks';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useForm } from '../util/hooks';
import { CREATE_COMMENT } from './../util/graphql';
import classNames from 'classnames';
import ErrorList from './ErrorList';
const CommentForm = ({ postId }) => {
  const { onChange, onSubmit, values } = useForm(callbackOn, {
    body: '',
    postId,
  });
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    variables: values,
  });

  function callbackOn() {
    createComment();
    values.body = '';
  }

  return (
    <>
      <Form onSubmit={onSubmit} noValidate className={classNames({ loading })}>
        <Form.TextArea
          placeholder='Comment here'
          name='body'
          value={values.body}
          onChange={onChange}
        />
        <Button
          content='Add Comment'
          labelPosition='left'
          icon='edit'
          primary
        />
      </Form>
      {error && <ErrorList errors={[error.graphQLErrors[0].message]} />}
    </>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentForm;
