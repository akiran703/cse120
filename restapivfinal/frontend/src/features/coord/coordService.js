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


//update coordinates
const updateCoord = async(id,coordData) => {
    const response = await axios.put(API_URL+id,coordData)

    return response.data
}


const coordService = {
    createCoord
}
export default coordService
