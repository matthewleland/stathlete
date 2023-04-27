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

const getPlayerStats = async (id) => {
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
    params: { id: id, season: '2022' },
    headers: {
      'X-RapidAPI-Key': '8bfc8ba653msha29b08fa4b30e05p1832cbjsn1b33b6d81643',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    },
  }
  const response = await axios.request(options)
  console.log(response)
  return response.data.response
}

const playerService = {
  getPlayerDetails,
  getPlayerStats,
}

export default playerService
