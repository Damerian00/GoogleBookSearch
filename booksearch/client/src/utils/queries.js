import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBook {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;