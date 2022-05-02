import axios  from 'axios'

const API_URL = '/api/alltime/'


const getallTimevalues = async () => {

    const response = await axios.get(API_URL)
  
    return response.data
  }


  const allService = {
    getallTimevalues,
}
export default allService