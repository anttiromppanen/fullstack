import React from 'react'
import blogService from '../services/blogs'

const NewBlogView = ({ title, author, url, setAndResetMessage, setAuthor, setTitle, setUrl, setBlogs, blogs }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    if (!newBlog.title || !newBlog.author || !newBlog.url) {
      setAndResetMessage('no empty fields allowed', false)
      return 
    }

    setAuthor('')
    setTitle('')
    setUrl('')

    try {
      const response = await blogService.create(newBlog)
      setAndResetMessage(`a new blog ${response.title} by ${response.author} added`, true) 
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

export default NewBlogView