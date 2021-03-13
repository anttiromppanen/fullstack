import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import ShowBlogs from './components/ShowBlogs'
import ShowUser from './components/ShowUser'
import NewBlogView from './components/NewBlogView'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [successOrError, setSuccessOrError] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setAndResetMessage(`succesfully logged in as ${user.name}`, true)
    } catch (error) {
      setAndResetMessage('wrong credentials', false)
      setPassword('')
    }
  }

  const createBlog = async ({ title, author, url }) => {
    const newBlog = {
      title,
      author,
      url
    }

    if (!newBlog.title || !newBlog.author || !newBlog.url) {
      setAndResetMessage('no empty fields allowed', false)
      return
    }


    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(newBlog)
      setAndResetMessage(`a new blog ${response.title} by ${response.author} added`, true)
      setBlogs(blogs.concat(response))
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')

    setAndResetMessage(`logged out user ${user.name}`, true)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addVote = async (blog) => {
    const newObject = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }

    try {
      const response = await blogService.update(newObject)
      // response.user comes as id, dunno why so need to do it this way
      const blogToReplace = blogs.find(x => x.id === response.id)
      blogToReplace.likes = response.likes
      setBlogs(blogs.map(x => x.id !== blogToReplace.id ? x : blogToReplace))
    } catch (error) {
      console.log(error.message)
    }
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogView
          createBlog={ createBlog }
        />
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
          <h2>blog app</h2>
          <ShowUser user={ user } handleLogout={ handleLogout } />
          { blogForm() }
          <ShowBlogs blogs={ blogs } setBlogs={ setBlogs } user={user} setAndResetMessage={ setAndResetMessage } addVote={addVote} />
        </div>
      )
    }
  }

  return (
    <div>
      <Notification message={ message } successOrError={ successOrError } />
      { siteViewLogic() }
    </div>
  )
}

export default App