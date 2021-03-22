import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    e.preventDefault()
    dispatch(addNewAnecdote(anecdote))
    dispatch(setNotification(`${anecdote} added`, 5))
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

export default AnecdoteForm