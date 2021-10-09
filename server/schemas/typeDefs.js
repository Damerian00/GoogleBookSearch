const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Books {
    _id: ID
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Query {
    Books: [Book]
    User(_id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    # Define the required parameters for updating a class
    saveBook(id: ID!, building: String!): Class
  }
`;

module.exports = typeDefs;
