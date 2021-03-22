import React from 'react'
import { useSelector,  useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filterValue = useSelector(state => state.filterValue)
  const anecdotesSortedByVotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
  const anecdotesFiltered = anecdotesSortedByVotes.filter(x => x.content.toLowerCase().includes(filterValue))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`vote added for ${anecdote.content}`, 5))
  }
  
  return (
    <div>
      {anecdotesFiltered.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList