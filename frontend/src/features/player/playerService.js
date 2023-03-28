import axios from 'axios'

const API_URL = '/api/players/'

// get player details
const getPlayerDetails = async (id) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }
  const response = await axios.get(`/api/players/${id}`)

  return response.data
}

const playerService = {
  getPlayerDetails,
}

export default playerService
