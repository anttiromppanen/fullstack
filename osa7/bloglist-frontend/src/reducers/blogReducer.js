import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return state.concat(action.data)
  case 'ADD_LIKE': {
    const blogToReplace = state.find(x => x.id === action.data.id)
    blogToReplace.likes = action.data.likes
    state = state.map(x => x.id !== blogToReplace.id ? x : blogToReplace)
    return state
  }
  case 'ADD_COMMENT': {
    const id = action.data.id
    return state.map(x => x.id !== id ? x : action.data)
  }
  case 'DELETE_BLOG':
    return state.filter(x => x.id !== action.data.id)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog,
    })
  }
}

export const addLike = (newBlog) => {
  return async dispatch => {
    const returnedBlog = await blogService.update(newBlog)
    dispatch({
      type: 'ADD_LIKE',
      data: returnedBlog
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const returnedBlog = await blogService.addComment(id, { comment })
    dispatch({
      type: 'ADD_COMMENT',
      data: returnedBlog,
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export default blogReducer