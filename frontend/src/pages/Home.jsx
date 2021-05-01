import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { Dimmer, Grid, Loader, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from './../components/PostCard';
import PostForm from './../components/PostForm';
import { FETCH_POSTS_QUERY } from './../util/graphql';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <Grid columns={3}>
      <Grid.Row className='title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>{user && <PostForm />}</Grid.Column>

        {loading ? (
          <Dimmer active inverted>
            <Loader inverted content='Loading' />
          </Dimmer>
        ) : (
          <Transition.Group>
            {data.getPosts &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id}>
                  <PostCard {...post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
