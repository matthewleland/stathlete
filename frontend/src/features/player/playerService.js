import axios from 'axios'

const API_URL = '/api/players/'

// get player details
const getPlayerDetails = async (playerData) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }
  console.log(playerData)
  const response = await axios.get('/api/players/details/:id', {
    body: { id: playerData.playerId },
  })

  return response.data
}

const playerService = {
  getPlayerDetails,
}

export default playerService
