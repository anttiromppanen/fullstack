import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, ListGroup } from 'react-bootstrap'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users)
    .find(x => x.id === id)

  if (!user) {
    return null
  }

  const blogs = user.blogs
    .map(blog => <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>)


  return (
    <Card>
      <Card.Body>
        <h2>{user.name || user.username}</h2>
        <br />
        <Card.Title>added blogs</Card.Title>
        <ListGroup>
          {blogs.length < 1
            ? <p>No blogs added</p>
            : blogs}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default User