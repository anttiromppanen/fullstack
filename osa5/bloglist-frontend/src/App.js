import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [successOrError, setSuccessOrError] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
  
  const resetMessageAndCondition = () => {
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
     setMessage(`succesfully logged in as ${user.name}`)
     setSuccessOrError(true)

     resetMessageAndCondition()
    } catch (error) {
      setMessage('wrong credentials')
      setSuccessOrError(false)

      resetMessageAndCondition()
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username 
              {/* Whitespace */}
              {'  '}
              <input 
                type="text" 
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
              {/* Whitespace */}
              {' '}
              <input 
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const showBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        { blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const showUser = () => {
    const handleLogout = () => {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setUsername('')
      setPassword('')
    }

    return (
      <p>
        { user.name } logged in
        {' '}
        <button onClick={ handleLogout }>logout</button>
      </p>
    )
  }

  const createNewBlogView = () => {
    const handleSubmit = async (e) => {
      e.preventDefault()

      const newBlog = {
        title,
        author,
        url
      }

      if (!newBlog.title || !newBlog.author || !newBlog.url) {
        setMessage('no empty fields allowed')
        setSuccessOrError(false)
        resetMessageAndCondition()
        return 
      }

      setAuthor('')
      setTitle('')
      setUrl('')

      try {
        const response = await blogService.create(newBlog)
        setMessage(`a new blog ${response.title} by ${response.author} added`)
        setSuccessOrError(true)
        resetMessageAndCondition()
        setBlogs(blogs.concat(response))
      } catch (error) {
        console.log(error) 
      }
    }
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={ handleSubmit }>
          <div>
            title:
            <input 
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author: 
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
 
  const siteViewLogic = () => {
    if (user === null) {
      return loginForm()
    } else {
      return (
        <div>
          <h2>blog app</h2>
          { showUser() }
          { createNewBlogView() }
          { showBlogs() }
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