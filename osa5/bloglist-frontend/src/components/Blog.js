import { getQueriesForElement } from '@testing-library/dom'
import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, setAndResetMessage }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    background: visible ? '#f9f9f9' : 'white',
    padding: 5,
    border: '1px solid lightgrey'
  }

  const buttonStyle = {
    background: 'white',
    color: visible ? 'red' : 'green',
    border: '2px solid lightgrey'
  }
  
  const removeButtonStyle = {
    display: blog.user.username === user.username ? '' : 'none',
    background: 'red',
    border: 0,
    color: 'white'
  }

  const likeButtonStyle = {
    background: 'green',
    border: 0,
    color: 'white'
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'view'
  const toggleVisibility = () => setVisible(!visible)

  const updateVotes = async (blog) => {
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
 
  const deleteBlog = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }

    try {
      const response = await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(x => x.id !== blog.id))
      setAndResetMessage(`removed blog ${blog.title} by ${blog.author}`, true)
      return response
    } catch (error) {
      console.log(error.message) 
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button style={buttonStyle} onClick={toggleVisibility}>{buttonText}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes} <button style={likeButtonStyle} onClick={() => updateVotes(blog)}>like</button></p>
        <p>{blog.user.name}</p>
        <button style={removeButtonStyle} onClick={() => deleteBlog()}>remove</button>
      </div>
    </div>
  )
}

export default Blog
