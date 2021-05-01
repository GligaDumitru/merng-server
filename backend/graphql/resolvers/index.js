const postResolvers = require('./posts');
const userResolvers = require('./users');

module.exports = {
  Post: {
    commentsCount: (parent) => parent.comments.length,
    likesCount: (parent) => parent.likes.length,
  },
  Query: {
    ...postResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
