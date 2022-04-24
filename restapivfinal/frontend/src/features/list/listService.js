import axios  from 'axios'

const API_URL = '/api/list/'

// create list
const createList = async (listData,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    const response = await axios.post(API_URL,listData,config)
    return response.data
}

// update list
const updateList = async(id,listData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        }
    const response = await axios.put(API_URL+id,listData, config)
    return response.data
}

// get list
const getLists = async (token) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  const response = await axios.get(API_URL,config)

  return response.data
}

// delete list
const deleteList = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + id, config)

  return response.data
}

const listService = {
    createList, updateList, getLists, deleteList
}
export default listService
