import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query getBooks($genre: String) {
    allBooks (genre: $genre) {
      title,
      published,
      genres,
      author {
        name
      }
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      name: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      published,
      genres,
      author {
        name
      }
    }
  }
`

export const EDIT_AUTHOR_AGE = gql`
  mutation editAuthorAge($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title,
      published,
      genres,
      author {
        name,
        born
      }
    }
  }
`