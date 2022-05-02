import axios  from 'axios'

const API_URL = '/api/allbol/'


const getAllBOL = async () => {

    const response = await axios.get(API_URL)
  
    return response.data
  }


  const allBOLService = {
    getAllBOL,
}
export default allBOLService