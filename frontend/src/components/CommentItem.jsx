import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Comment, Grid } from 'semantic-ui-react';

import DeleteComment from './DeleteComment';

const CommentItem = ({
  username,
  createdAt,
  body,
  canDelete,
  postId,
  commentId,
}) => {
  return (
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
      <Comment.Content>
        <Grid>
          <Grid.Row className='title'>
            <Grid.Column width={15}>
              <Comment.Author as='a'> {username} </Comment.Author>
              <Comment.Metadata>
                <div> {moment(createdAt).fromNow()} </div>
              </Comment.Metadata>
              <Comment.Text> {body} </Comment.Text>
            </Grid.Column>

            <Grid.Column width={1}>
              {canDelete && (
                <DeleteComment postId={postId} commentId={commentId} />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Comment.Content>
    </Comment>
  );
};

CommentItem.propTypes = {
  username: PropTypes.string,
  createdAt: PropTypes.string,
  body: PropTypes.string,
};

CommentItem.defaultProps = {
  username: '',
  createdAt: new Date().toISOString(),
  body: '',
};
export default CommentItem;
