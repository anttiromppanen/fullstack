import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const ShowBlogs = () => {
  const blogs = useSelector(state => state.blogs)
  const blogsSortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div id="blogs">
      <h2 className="mt-20">blogs</h2>
      <Table striped>
        <tbody>
          { blogsSortedByLikes.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td className="text-right">
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default ShowBlogs