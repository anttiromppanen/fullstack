import React from 'react'
import { addLike, addComment } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Table, Button, Form, ListGroup } from 'react-bootstrap'

const Blog = ({ setAndResetMessage }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(x => x.id === id)

  if (!blog) {
    return null
  }

  const commentsMapped = blog.comments
    .map(x => <ListGroup.Item key={uuidv4()}>{x}</ListGroup.Item>)

  const handleAddComment = async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value

    if (!comment) {
      return setAndResetMessage('no empty comments', false)
    }

    e.target.comment.value = ''
    dispatch(addComment(blog.id, comment))
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
      dispatch(addLike(newObject))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <Table bordered hover>
        <tbody>
          <tr>
            <th>url</th>
            <td>
              <a href={blog.url}>{blog.url}</a>
            </td>
          </tr>
          <tr>
            <th>likes</th>
            <td>
              {blog.likes} <Button variant="light" size="sm" onClick={() => addVote(blog)}>like</Button>
            </td>
          </tr>
          <tr>
            <th>added by</th>
            <td>{blog.author}</td>
          </tr>
        </tbody>
      </Table>
      <br />
      <h3>comments</h3>
      <ListGroup>
        {commentsMapped}
      </ListGroup>
      <br />
      <Form onSubmit={handleAddComment}>
        <Form.Group>
          <Form.Control type="text" name="comment" />
          <Button type="submit">add comment</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Blog
