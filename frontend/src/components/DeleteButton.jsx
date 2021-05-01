import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { Button, Confirm } from 'semantic-ui-react';

import { DELETE_POST } from '../util/graphql';
import { FETCH_POSTS_QUERY } from './../util/graphql';
import Tooltip from './Tooltip';

const DeleteButton = ({ postId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [...data.getPosts].filter((post) => post.id !== postId),
        },
      });
    },
    variables: { postId },
  });

  const handleOnClickLike = () => {
    deletePost();
  };

  return (
    <>
      <Tooltip content='Remove'>
        <Button
          floated='right'
          onClick={() => setConfirmOpen(true)}
          circular
          color='red'
          icon='remove'
        />
      </Tooltip>

      <Confirm
        open={confirmOpen}
        cancelButton='Never mind'
        confirmButton="Let's do it"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleOnClickLike}
      />
    </>
  );
};

export default DeleteButton;
