import React from 'react'

const Notification = ({ message, success }) => {
  const errorStyle = {
    border: 'solid 5px red',
    padding: 10,
    textAlign: 'center'
  }

  const successStyle = {
    border: 'solid 5px green',
    padding: 10,
    textAlign: 'center'
  }

  if (message === null) {
    return null
  }
  const errorOrSuccess = success ? successStyle : errorStyle

  return (
    <h1 style={ errorOrSuccess }>
      { message }
    </h1>  
  )
}

export default Notification
