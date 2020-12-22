import React from 'react'

const Person = ({ name, number, handlePersonDelete }) => 
  <p key={ name }>
    { name } { number } <button onClick={  handlePersonDelete }>delete</button>
  </p>

export default Person
