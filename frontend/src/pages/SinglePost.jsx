import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Comment,
  Dimmer,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Loader,
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { FETCH_POST_QUERY } from '../util/graphql';
import CommentForm from './../components/CommentForm';
import CommentItem from './../components/CommentItem';
import DeleteButton from './../components/DeleteButton';
import LikeButton from './../components/LikeButton';

const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const { loading, data = {} } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });
  const { getPost } = data;
  const isLoading = (
    <Dimmer active inverted>
      <Loader inverted content='Loading' />
    </Dimmer>
  );
  const renderPostDetails = (
    <Grid>
      <Grid.Row className='title'>
        <h1>Single Post Page</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg'
            size='small'
            float='right'
          />
        </Grid.Column>
        <Grid.Column width={10}>
          {!!getPost && (
            <Card.Group>
              <Card fluid>
                <Card.Content>
                  <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                  />
                  <Card.Header>{getPost.username}</Card.Header>
                  <Card.Meta as={Link} to={`/posts/${getPost.id}`}>
                    {moment(getPost.createdAt).fromNow(true)}
                  </Card.Meta>
                  <Card.Description>{getPost.body}</Card.Description>
                </Card.Content>
                {user && (
                  <Card.Content extra>
                    <LikeButton
                      likes={getPost.likes}
                      likesCount={getPost.likesCount}
                      postId={getPost.id}
                    />
                    <Button as='div' labelPosition='right'>
                      <Button basic color='teal'>
                        <Icon name='comments' />
                      </Button>
                      <Label basic color='teal' pointing='left'>
                        {getPost.commentsCount}
                      </Label>
                    </Button>
                    {user.username === getPost.username && (
                      <DeleteButton postId={getPost.id} />
                    )}
                  </Card.Content>
                )}
                <Card.Content>
                  <Comment.Group>
                    <Header as='h3'>Comments</Header>
                    {user ? (
                      <CommentForm postId={getPost.id} />
                    ) : (
                      <Button as={Link} to='/login' animated>
                        <Button.Content visible>
                          Login to add comment
                        </Button.Content>
                        <Button.Content hidden>
                          <Icon name='arrow right' />
                        </Button.Content>
                      </Button>
                    )}
                    {getPost.comments.map((comment) => (
                      <CommentItem
                        canDelete={
                          user.username === comment.username ? true : false
                        }
                        postId={getPost.id}
                        commentId={comment.id}
                        {...comment}
                      />
                    ))}
                  </Comment.Group>
                </Card.Content>
              </Card>
            </Card.Group>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  return <>{loading ? <>{isLoading}</> : <>{renderPostDetails}</>}</>;
};

export default SinglePost;
