const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');
const postResolvers = {
  Query: {
    async getPosts() {
      try {
        return await Post.find().sort({ createdAt: -1 });
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found!');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      if (body.trim() === '') {
        throw new Error('Post body must not be empty!');
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (post) {
          if (user.username === post.username) {
            await post.delete();
            return 'Post deleted successfully!';
          }
          throw new Error('You are unable to delete this post, is not yours');
        }
        throw new Error('Post not found');
      } catch (err) {
        throw new Error(err);
      }
    },
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context);
      try {
        if (body.trim() === '') {
          throw new Error('Comment body must not be empty!');
        }
        const post = await Post.findById(postId);
        if (post) {
          const newComment = {
            body,
            username,
            createdAt: new Date().toISOString(),
          };
          post.comments.unshift(newComment);
          await post.save();
          return post;
        }
        throw new Error('Post not find!');
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteComment(_, { postId, commentId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          const findComment = post.comments.some(
            (comment) => comment.id === commentId
          );
          if (findComment) {
            post.comments = post.comments.filter(
              (comment) => comment.id !== commentId
            );
            await post.save();
            return post;
          }
          throw new Error('Comment not found!');
        }
        throw new Error('Post not found');
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          const existLike = post.likes.some(
            (like) => like.username === user.username
          );
          if (existLike) {
            post.likes = post.likes.filter(
              (like) => like.username !== user.username
            );
          } else {
            post.likes.unshift({
              username: user.username,
              createdAt: new Date().toISOString(),
            });
          }

          await post.save();
          return post;
        }
        throw new Error('Post not found!');
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = postResolvers;
