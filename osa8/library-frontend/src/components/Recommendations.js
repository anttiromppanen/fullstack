import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = ({ show, books }) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [favoriteGenre, setFavoriteGenre] = useState('')

  const getFavoriteGenre = () => {
    let genresByNumber = {}
    let maxNumGenres = 0
    let favoriteGenre = ''
    const genres = books.data.allBooks.map(x => x.genres).flat()

    genres.forEach(x => {
      x in genresByNumber
        ? genresByNumber[x] = genresByNumber[x] + 1
        : genresByNumber[x] = 1
      
      if (genresByNumber[x] > maxNumGenres) {
        favoriteGenre = x
        maxNumGenres = genresByNumber[x]
      }
    })

    return favoriteGenre
  }

  useEffect(() => {
    if (books.data) {
      setFavoriteGenre(getFavoriteGenre())
      getBooks({ variables: { genre: favoriteGenre } })
    }
  }, [books, getBooks, favoriteGenre]) // eslint-disable-line

  if (!show) {
    return null
  }

  console.log(result)
  return (
    <div> 
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
            {result.data.allBooks.map(x => 
              <tr key={x.id}>
                <td>{x.title}</td>
                <td>{x.name}</td>
                <td>{x.published}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations