import axios  from 'axios'

const API_URL = '/api/allpo/'


const getAllPO = async () => {

    const response = await axios.get(API_URL)
  
    return response.data
  }


  const allPOService = {
    getAllPO,
}
export default allPOService