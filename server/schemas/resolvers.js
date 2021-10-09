const { Book, User } = require('../models');

const resolvers = {
  Query: {
    books: async () => {
      return await Book.find({}).populate('title').populate({
        path: 'books',
        populate: 'title'
      });
    },
    users: async (parent, args) => {
      return await User.findById(args.id);
    },
  },
  Mutation: {
    createUser: async (parent, { name, location, studentCount }) => {
      return await School.create({ name, location, studentCount });
    },
    updateClass: async (parent, { id, building }) => {
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
