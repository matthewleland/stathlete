import axios from 'axios'

// search players collection
const searchPlayers = async (text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get('/api/players/search', text, config)
  console.log(response.data)
  return response.data
}

const searchService = {
  searchPlayers
}

export default searchService