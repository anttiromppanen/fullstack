import React from 'react'

const Notification = ({ msg, errorOrSuccess }) => {
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

  const setStyle = errorOrSuccess ? successStyle : errorStyle

  if (msg === null) return null 
  
  return (
    <h1 style={ setStyle }>
      { msg }
    </h1>
  )
}

export default Notification
