import React from 'react'
import { connect } from 'react-redux'
import { changeFilterValue } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    props.changeFilterValue(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = { changeFilterValue }

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter