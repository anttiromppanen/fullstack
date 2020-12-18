import React from 'react'

const Person = ({ name, number }) => 
  <p key={ name }>
    { name } { number }
  </p>

export default Person
