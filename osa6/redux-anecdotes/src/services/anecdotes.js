/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async (anecdote) => {
  const newAnecdote = {
    content: anecdote,
    votes: 0
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const voteAnecdote = async (anecdote) => {
  const updatedAnecdote = {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes + 1
  }

  try {
    const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return response.data
  } catch (error) {
    console.log(error.message) 
  }
}

export default { getAll, addAnecdote, voteAnecdote }