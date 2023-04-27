import axios from 'axios'

const getTeamDetails = async (id) => {
  const response = await axios.get(`/api/teams/${id}`)
  console.log(response.data)
  return response.data
}

const teamService = {
  getTeamDetails,
}

export default teamService
