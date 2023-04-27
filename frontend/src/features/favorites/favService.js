import axios from 'axios'

const API_URL = '/api/favorites/'

// create new favorite
const createFavorite = async (details, token) => {
  console.log(details)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, details, config)

  return response.data
}

// get user favorites
const getFavorites = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// delete user favorite
const deleteFavorite = async (favId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + favId, config)

  return response.data
}

const favService = {
  createFavorite,
  getFavorites,
  deleteFavorite,
}

export default favService
