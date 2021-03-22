import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ({ message }) => {
  const notificationState = useSelector(state => state.notification)

  const style = {
    display: notificationState ? 'block' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notificationState}
    </div>
  )
}

export default Notification