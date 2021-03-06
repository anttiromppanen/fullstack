import React from 'react'

const ShowUser = ({ user, handleLogout }) => {
  return (
    <p>
      { user.name } logged in
      {' '}
      <button onClick={ handleLogout }>logout</button>
    </p>
  )
}

export default ShowUser