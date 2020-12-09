import React from 'react'

const Filter = ({ filterValue, setFilterValue }) => {

  const handleChange = (e) => {
    setFilterValue(e.target.value)
  }

  return (
    <div>
      <form>
        find countries <input value={ filterValue } onChange={ handleChange } />
      </form>
    </div>
  )
}

export default Filter
