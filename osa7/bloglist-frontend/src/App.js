import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import ShowBlogs from './components/ShowBlogs'
import NewBlogView from './components/NewBlogView'
import BlogsByUsers from './components/BlogsByUsers'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import Togglable from './components/Togglable'

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [message, setMessage] = useState(null)
  const [successOrError, setSuccessOrError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const setAndResetMessage = (msg, trueGreenfalseRed) => {
    setMessage(msg)
    setSuccessOrError(trueGreenfalseRed)

    setTimeout(() => {
      setMessage(null)
      setSuccessOrError(null)
    }, 5000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const getUser = await loginService.login({ username, password })
      dispatch(setUser(getUser))
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(getUser)
      )
      setUsername('')
      setPassword('')
      setAndResetMessage(`succesfully logged in as ${getUser.name}`, true)
    } catch (error) {
      setAndResetMessage('wrong credentials', false)
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')

    setAndResetMessage(`logged out user ${user.name}`, true)
    dispatch(removeUser())
    setUsername('')
    setPassword('')
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogView blogFormRef={blogFormRef} setAndResetMessage={setAndResetMessage} />
      </Togglable>
    )
  }

  const siteViewLogic = () => {
    if (user === null) {
      return <LoginForm
        handleLogin={ handleLogin }
        username={ username }
        setUsername={ setUsername }
        password={ password }
        setPassword={ setPassword }
      />
    } else {
      return (
        <div>
          <Router>
            <Navigation handleLogout={handleLogout} />
            <br />
            <h1>blog app</h1>
            <br />
            { blogForm() }
            <Switch>
              <Route path="/blogs/:id">
                <Blog setAndResetMessage={setAndResetMessage} />
              </Route>
              <Route path="/users/:id">
                <User />
              </Route>
              <Route path="/users">
                <BlogsByUsers />
              </Route>
              <Route>
                <ShowBlogs setAndResetMessage={ setAndResetMessage } />
              </Route>
            </Switch>
          </Router>
        </div>
      )
    }
  }

  return (
    <div className="container">
      <Notification message={ message } successOrError={ successOrError } />
      { siteViewLogic() }
    </div>
  )
}

export default App