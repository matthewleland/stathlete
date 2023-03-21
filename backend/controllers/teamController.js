const asyncHandler = require('express-async-handler')
const url = require('url')
const { models, model } = require('mongoose')
const axios = require('axios')

const Team = require('../models/teamModel')

// @desc    Create new teams
// @route   POST /api/players/create
// @access  Restricted
const createTeams = asyncHandler(async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams',
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_API_HOST,
    },
  }

  try {
    const teamsRes = await axios.request(options)
    // console.log(teamsRes.data.response)
    const teamsArr = teamsRes.data.response
    // console.log(teamsArr)
    for (let t in teamsArr) {
      let team = teamsArr[t]
      if (team.nbaFranchise) {
        let existingTeams = await models.Team.find({
          id: team.id,
        })
        if (existingTeams.length === 0 && team.name !== 'Home Team Stephen A') {
          // add nba team to database

          await Team.create({
            id: team.id,
            name: team.name,
            nickname: team.nickname,
            code: team.code,
            city: team.city,
            logo: team.logo,
          })
          console.log('new team: ' + team.name)
        }
      }
    }
    res.status(201).json(nbaArr)
  } catch (error) {
    res.json(error)
  }
})

module.exports = {
  createTeams,
}
