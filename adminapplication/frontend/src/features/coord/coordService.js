import axios  from 'axios'


const API_URL = '/api/info/'

//create new coordinates
const createCoord = async (coordData,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    const response = await axios.post(API_URL,coordData,config)

    return response.data
}

//get coordinates
const getCoord = async (token) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  const response = await axios.get(API_URL,config)

  return response.data
}



//update coordinates
const updateCoord = async(id,coordData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    }
    const response = await axios.put(API_URL+id,coordData,config)

    return response.data
}


//delete coordinate
const deletecoordinates = async(id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
    const response = await axios.delete(API_URL+id,config)
    return response.data
}


const coordService = {
    createCoord,
    updateCoord,
    getCoord,
    deletecoordinates,
}
export default coordService