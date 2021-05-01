import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';
import Tooltip from './Tooltip';

const PostCard = ({
  body,
  createdAt,
  id,
  username,
  likesCount,
  commentsCount,
  likes,
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {user && (
            <LikeButton likes={likes} likesCount={likesCount} postId={id} />
          )}
          <Tooltip content='Comment on this post'>
            <Button as={Link} to={`/posts/${id}`} labelPosition='right'>
              <Button color='blue' basic>
                <Icon name='comment' />
              </Button>
              <Label basic color='blue' pointing='left'>
                {commentsCount}
              </Label>
            </Button>
          </Tooltip>

          {user && user.username === username && <DeleteButton postId={id} />}
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

PostCard.propTypes = {
  body: PropTypes.string,
  createdAt: PropTypes.string,
  id: PropTypes.string,
  username: PropTypes.string,
  likesCount: PropTypes.number,
};

PostCard.defaultProps = {
  body: '',
  createdAt: '',
  id: '',
  username: '',
  likesCount: 0,
};

export default PostCard;
