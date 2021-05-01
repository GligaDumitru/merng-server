const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../util/validators');

const generateToken = ({ id, email, username }) =>
  jwt.sign(
    {
      id,
      email,
      username,
    },
    SECRET_KEY,
    {
      expiresIn: '1h',
    }
  );
module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { username, password }) {
      // Validate user data
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError('Error on login', { errors });
      }

      // Check if user exist
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError('Error on login', {
          errors: {
            general: 'Username or password incorect!',
          },
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new UserInputError('Error on login', {
          errors: {
            general: 'Username or password incorect!',
          },
        });
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // Validate user data
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // Make sure user doesn't already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: `This username: ${username} is taken`,
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
