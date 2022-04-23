import axios  from 'axios'

const API_URL = '/api/checkIn/'

const createDriver = async (driverData,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    console.log(driverData)
    const response = await axios.post(API_URL,driverData,config)
    if(response.data)
    {
        localStorage.setItem('drivers',JSON.stringify(response.data))
    }
    console.log(response.data)
    return response.data
}

const updateDriver = async(id,driverData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        }
    const response = await axios.put(API_URL+id,driverData, config)
    console.log(driverData)
    if (response.data) {
        localStorage.setItem('drivers', JSON.stringify(response.data))
      }
      console.log(response.data)

    return response.data
}

const getDrivers = async (token) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  const response = await axios.get(API_URL,config)

  return response.data
}

const deleteDriver = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + id, config)

  return response.data
}

const checkService = {
    createDriver, updateDriver, getDrivers, deleteDriver
}
export default checkService
