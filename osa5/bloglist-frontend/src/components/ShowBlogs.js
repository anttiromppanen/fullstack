import React from 'react'
import Blog from './Blog'

const ShowBlogs = ({ blogs, setBlogs, user, setAndResetMessage }) => {
  const blogsSortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      { blogsSortedByLikes.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} setAndResetMessage={setAndResetMessage} />
      )}
    </div>
  )
}

export default ShowBlogs