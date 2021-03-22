import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote =>
        anecdote.id !== action.data.id ? anecdote : action.data
      )
    case 'ADD_NEW':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (content) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(content)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const addNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addAnecdote(content)
    dispatch({
      type: 'ADD_NEW',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer