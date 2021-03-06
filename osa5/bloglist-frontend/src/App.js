import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import ShowBlogs from './components/ShowBlogs'
import ShowUser from './components/ShowUser'
import NewBlogView from './components/NewBlogView'

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
 
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')

    setAndResetMessage(`logged out user ${user.name}`, true)
    setUser(null)
    setUsername('')
    setPassword('')
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
          <NewBlogView
            author={ author }
            blogs={ blogs }
            setAndResetMessage={ setAndResetMessage }
            setAuthor={ setAuthor }
            setBlogs={ setBlogs}
            setTitle={ setTitle }
            setUrl={ setUrl }
            title={ title }
            url={ url }
          />
          <ShowBlogs blogs={ blogs } />
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