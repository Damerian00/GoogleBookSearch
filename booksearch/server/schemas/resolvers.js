const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
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
    saveBook: async (parent, { newBook }, context) => {
      // Find and update the matching class using the destructured args
    const updatedUser = await User.findOneAndUpdate(
      {_id: context.user._id},
      {$addToSet: { savedBook: newBook }},
      { new: true, runValidators: true}
    )
    return updatedUser;
   },
    removeBook: async (parent, { bookId }, context) => {
       const updatedUser = await User.findOneAndUpdate(
         { _id: bookId, user },
         { $pull: {savedBooks: {bookId}}},
         {new: true}
         )
        return updatedUser; 
     }
  },
};

module.exports = resolvers;
