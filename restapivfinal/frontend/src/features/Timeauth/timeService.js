import axios  from 'axios'


const API_URL = '/api/time/'


//create new time
const createTime = async (timeData,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    const response = await axios.post(API_URL,timeData,config)

    return response.data
}


//update time
const updateTimeToNew = async(id,timeData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL+id,timeData,config)

  return response.data
}


const timeService = {
    createTime,
    updateTimeToNew,

}
export default timeService