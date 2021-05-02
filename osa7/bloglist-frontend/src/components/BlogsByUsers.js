import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogsByUsers = () => {
  const users = useSelector(state => state.users)

  const usersAsTable = users.map(user => {
    return (
      <tr key={user.id}>
        <td>
          <Link to={`/users/${user.id}`}>
            {user.name || user.username}
          </Link>
        </td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersAsTable}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogsByUsers