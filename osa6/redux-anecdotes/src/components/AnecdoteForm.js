import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (e) => {
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    e.preventDefault()
    props.addNewAnecdote(anecdote)
    props.setNotification(`${anecdote} added`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  addNewAnecdote
}

const ConnectedAnecdotes = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdotes