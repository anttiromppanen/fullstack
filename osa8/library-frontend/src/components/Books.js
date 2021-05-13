import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState(null)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (props.books) {
      setBooks(props.books.allBooks)
    }
  }, [props.books])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!props.show || !props.books) {
    return null
  }

  const genres = [...new Set(props.books.allBooks.map(x => x.genres).flat())]
 
  const filterByGenre = (e) => {
    getBooks({ variables: { genre: e.target.innerText } })
  }  

  const getAllBooks = () => {
    getBooks()
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(x => 
          <button onClick={filterByGenre} key={x} >{x}</button>
        )}
        <button onClick={getAllBooks}>all genres</button>
      </div>
    </div>
  )
}

export default Books