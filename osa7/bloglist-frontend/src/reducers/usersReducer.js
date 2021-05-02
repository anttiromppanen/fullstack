import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_USERS':
    state = action.data
    return state
  default:
    return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    const blogs = await usersService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: blogs
    })
  }
}

export default usersReducer