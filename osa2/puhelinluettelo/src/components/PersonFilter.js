import React from 'react'

const PersonFilter = ({ filterValue, handleFilterChange }) => {
  return (
    <form>
      filter shown with <input value={ filterValue } onChange={ handleFilterChange } />
    </form>
  ) 
}

export default PersonFilter
