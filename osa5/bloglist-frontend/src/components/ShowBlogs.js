import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const ShowBlogs = ({ blogs, setBlogs, user, setAndResetMessage, addVote }) => {
  const blogsSortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div id="blogs">
      <h2>blogs</h2>
      { blogsSortedByLikes.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} setAndResetMessage={setAndResetMessage} addVote={addVote} />
      )}
    </div>
  )
}

ShowBlogs.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

export default ShowBlogs