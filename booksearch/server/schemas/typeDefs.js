const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    bookId: ID
    authors: [String]
    description: String
    image: String
    link: String
    title: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }

  input SearchBook {
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
  }
  type Query{
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    # Define the required parameters for updating a class
    saveBook(newBook: SearchBook!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
