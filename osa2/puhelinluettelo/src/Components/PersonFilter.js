import React from 'react'

const PersonFilter = ({ handleFilterChange, filterValue }) => {
  return (
    <div>
      filter shown with <input onChange={ handleFilterChange } value={ filterValue } />
    </div>
  )
}

export default PersonFilter
