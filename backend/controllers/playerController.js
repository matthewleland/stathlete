const asyncHandler = require('express-async-handler')
const url = require('url')
const { models, model } = require('mongoose')
const axios = require('axios')

const playerData = require('../DATA/basicPlayerData.json')
const { listenerCount } = require('../models/playerModel')

const Player = require('../models/playerModel')
const Team = require('../models/teamModel')

// @desc    Create new players
// @route   POST /api/players/create
// @access  Restricted
const createPlayers = asyncHandler(async (req, res) => {
  try {
    const teamsArr = await models.Team.find()
    for (let t in teamsArr) {
      let team = teamsArr[t]
      let id = team.id
      console.log(id)
      let options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/players',
        params: { team: id, season: '2022' },
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': process.env.RAPID_API_HOST,
        },
      }

      let playersRes = await axios.request(options)
      let playersArr = playersRes.data.response

      let targetArr = playerData.league.standard

      for (let p in playersArr) {
        let player = playersArr[p]
        let pPhotoId
        let pImgUrl
        let pPos
        let pFullName
        console.log(player)
        if (player) {
          let existingPlayer = await models.Player.find({
            id: player.id,
          })
          if (existingPlayer.length === 0) {
            for (let i in targetArr) {
              let displayName = player.lastname + ', ' + player.firstname
              let targetName = targetArr[i].temporaryDisplayName
              if (displayName === targetName) {
                pPhotoId = targetArr[i].personId
                pImgUrl = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${pPhotoId}.png`
                pPos = targetArr[i].pos
              }
            }
            pFullName = `${player.firstname} ${player.lastname}`

            await Player.create({
              id: player.id,
              imgUrl: pImgUrl,
              firstName: player.firstname,
              lastName: player.lastname,
              fullName: pFullName,
              pos: pPos,
              teamId: team.id,
              teamName: team.name,
              birthdate: player.birth.date,
              heightFeet: player.height.feets,
              heightInches: player.height.inches,
              weightPounds: player.weight.pounds,
              rookieYear: player.nba.start,
              yearsPro: player.pro,
              college: player.college,
              country: player.birth.country,
            })
            console.log(
              'new player: ' + player.firstname + ' ' + player.lastname
            )
          }
        }
      }
    }
    res.status(201).send('Import player data complete')
  } catch (error) {
    res.send(error)
  }
})

const searchPlayers = asyncHandler(async (req, res) => {
  const results = await models.Player.find({
    fullName: new RegExp(`.*${req.query.q}.*`, 'i'),
  })

  if (results) {
    res.status(200).json(results)
  } else {
    res.status(400)
    throw new Error('Error executing')
  }
})

const getPlayerDetails = asyncHandler(async (req, res) => {
  try {
    const id = Number(req.url.slice(1))
    console.log(id)
    const results = await models.Player.findOne({
      playerId: id,
    })

    // console.log(results)
    res.status(200).json(results)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = {
  createPlayers,
  searchPlayers,
  getPlayerDetails,
}
