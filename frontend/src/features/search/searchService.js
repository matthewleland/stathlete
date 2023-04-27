import axios from 'axios'

// search players collection
const searchPlayers = async (text) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // }

  // console.log(text)
  const response = await axios.get('/api/players/search', {
    params: { q: text },
  })
  return response.data
}

const searchTeams = async (text) => {
  const response = await axios.get('/api/teams/search', {
    params: { q: text },
  })
  return response.data
}

const searchService = {
  searchPlayers,
  searchTeams,
}

export default searchService
