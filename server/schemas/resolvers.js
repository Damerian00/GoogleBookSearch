const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('savedBooks');
    },
    user: async (parent, {username} ) => {
      return await User.findone({ username}).popilate('savedBooks');
    },
  },
    savedBooks: async (parent, {username}) => {
      const params = username ? { username } : {};
      return await Book.find({}).populate('title').populate({
        path: 'books',
        populate: 'title'
      });
    },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { id, building }) => {
      // Find and update the matching class using the destructured args
      return await Class.findOneAndUpdate(
        { _id: id }, 
        { building },
        // Return the newly updated object instead of the original
        { new: true }
      );
    }
  }
};

module.exports = resolvers;
