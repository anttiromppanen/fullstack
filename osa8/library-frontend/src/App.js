import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const navigationView = () => {
    if (token) {
      return (
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommendations')}>recommend</button>
          <button onClick={logout}>logout</button>
        </div>
      )
    }

    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>
    )
  }
  
  return (
    <div>
      { navigationView() }

      <Authors
        show={page === 'authors'}
        authors={authors.data}
      />

      <Books
        show={page === 'books'}
        books={books.data}
      />

      {token
        ? <NewBook show={page === 'add'} setPage={setPage} />
        : null
      }

      {token
        ? <Recommendations show={page === 'recommendations'} books={books} />
        : null
      }

      <Login 
        show={page === 'login'}
        setToken={setToken}
        logout={logout}
        setPage={setPage}
      />
    </div>
  )
}

export default App