import axios  from 'axios'

const API_URL = '/api/upload/'

// create BOL upload
const createUpload = async (uploadData,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    const response = await axios.post(API_URL,uploadData,config)
    return response.data
}

// update BOL upload
const updateUpload = async(id,uploadData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        }
    const response = await axios.put(API_URL+id,uploadData, config)

    return response.data
}

// get BOL upload
const getUploads = async (token) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  const response = await axios.get(API_URL,config)

  return response.data
}

// delete BOL upload
const deleteUpload = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + id, config)

  return response.data
}
const uploadService = {
    createUpload, updateUpload, getUploads, deleteUpload
}
export default uploadService
