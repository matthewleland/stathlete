import axios from 'axios'

const getTeamDetails = async (id) => {
  const response = await axios.get(`/api/teams/${id}`)

  return response.data
}
let yearlyStats = []
const getTeamStats = async (id) => {
  for (let y = 2018; y < 2023; y++) {
    let options = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/teams/statistics',
      params: {
        id: id,
        season: y,
      },
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': '8bfc8ba653msha29b08fa4b30e05p1832cbjsn1b33b6d81643',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      },
    }
    let response = await axios.request(options)
    console.log(response)

    yearlyStats.push(response.data)
  }
  console.log(yearlyStats)
  const trimmed = yearlyStats.reduce((accumulator, current) => {
    if (
      !accumulator.find(
        (item) => item.parameters.season === current.parameters.season
      )
    ) {
      accumulator.push(current)
    }
    return accumulator
  }, [])
  console.log(trimmed)
  return trimmed
}

const teamService = {
  getTeamDetails,
  getTeamStats,
}

export default teamService
