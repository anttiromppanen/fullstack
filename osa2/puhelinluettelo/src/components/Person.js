import React from 'react'

const Person = ({ name, number, handlePersonDelete }) => {

  return (
    <div>
      {name} {number} <button onClick={ handlePersonDelete }>delete</button>
    </div>
  )
}

export default Person
