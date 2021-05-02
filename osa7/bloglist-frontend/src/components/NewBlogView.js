import React, { useState } from 'react'
import { addBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const NewBlogView = ({ blogFormRef, setAndResetMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleAddBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    if (!newBlog.title || !newBlog.author || !newBlog.url) {
      setAndResetMessage('no empty fields allowed', false)
      return
    }


    try {
      dispatch(addBlog(newBlog))
      blogFormRef.current.toggleVisibility()
      setAndResetMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`, true)
    } catch (error) {
      console.log(error)
    }

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={ handleAddBlog } className="formDiv">
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button id="create" type="submit">create</Button>
      </Form>
    </div>
  )
}

export default NewBlogView