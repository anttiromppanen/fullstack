const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      const newState = action.data
      return newState
    default:
      return state
  }
}

export const changeFilterValue = (value) => {
  return {
    type: 'CHANGE_FILTER',
    data: value
  }
}

export default reducer