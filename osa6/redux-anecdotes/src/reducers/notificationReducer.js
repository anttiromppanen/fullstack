const reducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      const newState = action.data
      return newState
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(createNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export const createNotification = (message) => {
  return {
    type: 'CREATE_NOTIFICATION',
    data: message
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default reducer