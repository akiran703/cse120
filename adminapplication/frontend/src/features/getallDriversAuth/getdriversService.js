import axios  from 'axios'

const API_URL = '/api/alldriver/'


const getalldrivervalues = async () => {

    const response = await axios.get(API_URL)
  
    return response.data
  }


  const getdriversService = {
    getalldrivervalues,
}
export default getdriversService