import React from 'react'

const Notification = ({ message, successOrError }) => {
  const successStyle = {
    border: '5px solid green',
    color: 'green',
    margin: '0 5px 30px 5px',
    padding: 10
  }

  const errorStyle = {
    border: '5px solid red',
    color: 'red',
    margin: '0 5px 30px 5px',
    padding: 10
  }

  const setStyle = successOrError ? successStyle : errorStyle

  if (message === null) return null

  return (
    <h1 className="notification" style={ setStyle }>
      { message }
    </h1>
  )
}

export default Notification