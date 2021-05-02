const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    state = action.data
    return state
  case 'REMOVE_USER':
    state = action.data
    return state
  case 'GET_ALL_USERS':
    return
  default:
    return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user,
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVE_USER',
    data: null
  }
}

export default userReducer