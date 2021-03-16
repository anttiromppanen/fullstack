import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, setAndResetMessage, addVote }) => {
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
    border: '1px solid black',
    color: 'white'
  }

  const likeButtonStyle = {
    background: 'green',
    border: '1px solid black',
    color: 'white'
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'view'
  const toggleVisibility = () => setVisible(!visible)

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
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} <button style={buttonStyle} onClick={toggleVisibility} className="toggleInformation">{buttonText}</button>
      <div style={showWhenVisible} className="togglableContent">
        <p>{blog.url}</p>
        <p>
          <span id="likeCount" style={{ marginRight: '5px' }}>{blog.likes}</span>
          <button style={likeButtonStyle} onClick={() => addVote(blog)}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button style={removeButtonStyle} onClick={() => deleteBlog()}>remove</button>
      </div>
    </div>
  )
}

export default Blog
