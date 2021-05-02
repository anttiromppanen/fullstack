import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

const ShowUser = ({ handleLogout }) => {
  const user = useSelector(state => state.user)

  return (
    <span>
      { user.name } logged in
      {' '}
      <Button onClick={ handleLogout }>logout</Button>
    </span>
  )
}

export default ShowUser