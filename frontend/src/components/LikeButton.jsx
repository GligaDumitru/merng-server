import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { findUserInArray } from './../util/helpers';
import Tooltip from './Tooltip';

const LikeButton = ({ likes, likesCount, postId }) => {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(!findUserInArray(likes, user.username));
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, { variables: { postId } });

  const handleOnClickLike = (evt) => {
    likePost();
  };

  return (
    <Tooltip content={!liked ? 'Unlike' : 'Like'}>
      <Button as='div' labelPosition='right'>
        <Button color='teal' basic={liked} onClick={handleOnClickLike}>
          <Icon name='heart' />
        </Button>
        <Label basic color='teal' pointing='left'>
          {likesCount}
        </Label>
      </Button>
    </Tooltip>
  );
};
const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        createdAt
        username
      }
      likesCount
    }
  }
`;
export default LikeButton;
