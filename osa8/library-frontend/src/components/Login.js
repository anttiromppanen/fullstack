import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({ show, setToken, setPage }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })

    setUsername('')
    setPassword('')
    setPage('authors')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <br />
      <form onSubmit={submit}>
        <div>
          username
          <input type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)} 
          />
        </div>
        <div>
          password
          <input type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)} 
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login