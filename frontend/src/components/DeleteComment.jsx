import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { Button, Confirm } from 'semantic-ui-react';

import { DELETE_COMMENT } from '../util/graphql';
import { FETCH_POSTS_QUERY } from './../util/graphql';

const DeleteComment = ({ postId, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_COMMENT, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [...data.getPosts].map((post) => {
            if (post.id !== postId) {
              return post.comments.filter((comId) => comId !== commentId);
            }
            return null;
          }),
        },
      });
    },
    variables: { postId, commentId },
  });

  const handleOnClickLike = () => {
    deletePost();
    setConfirmOpen(false);
  };

  return (
    <>
      <Button
        floated='right'
        onClick={() => setConfirmOpen(true)}
        circular
        color='red'
        icon='remove'
      />
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

export default DeleteComment;
