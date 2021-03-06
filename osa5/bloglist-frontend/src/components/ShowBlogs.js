import React from 'react'
import Blog from './Blog'

const ShowBlogs = ({ blogs }) => {

    return (
      <div>
        <h2>blogs</h2>
        { blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
}

export default ShowBlogs