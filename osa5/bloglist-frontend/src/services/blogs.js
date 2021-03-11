import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const updatedBlog = {
    title: newObject.title,
    author: newObject.author,
    url: newObject.url,
    likes: newObject.likes
  }
  
  try {
    const response = await axios.put(`${baseUrl}/${newObject.id}`, updatedBlog)
    return response.data
  } catch (error) {
    console.log(error.message) 
  }
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, { headers:{ "Authorization": token } })
  return response.data
}

export default { getAll, setToken, create, update, deleteBlog }