const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
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
    savedBooks: [Book]!
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    Books: [Book]
    users: [User]
    savedBooks(username: String): [Book]
    book(bookId: ID!): Book
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    # Define the required parameters for updating a class
    saveBook(bookId: ID!): Book
    deleteBook(bookId: ID!): Book
  }
`;

module.exports = typeDefs;
