const asyncHandler = require('express-async-handler')
const { models } = require('mongoose')

const playerData = require('../DATA/basicPlayerData.json')
const { listenerCount } = require('../models/playerModel')

const Player = require('../models/playerModel')

// @desc    Create new players
// @route   POST /api/players/create
// @access  Restricted
const createPlayers = asyncHandler(async (req, res) => {
  const numPlayers = playerData.league.standard.length
  try {
    let n = 1
    for (i = 0; i < numPlayers; i++) {
      let p = playerData.league.standard[i]
      if (p.isActive === true) {
        // let full = p.firstName + ' ' + p.lastName
        // let player = await Player.create({
        //   firstName: p.firstName,
        //   lastName: p.lastName,
        //   fullName: full,
        //   displayName: p.temporaryDisplayName,
        //   playerId: p.personId,
        //   teamId: p.TeamId,
        //   jersey: p.jersey,
        //   isActive: p.isActive,
        //   pos: p.pos,
        //   heightFeet: p.heightFeet,
        //   heightInches: p.heightInches,
        //   weightPounds: p.weightPounds,
        //   dateOfBirthUTC: p.dateOfBirthUTC,
        //   teams: p.teams,
        //   draft: p.draft,
        //   nbaDebutYear: p.nbaDebutYear,
        //   yearsPro: p.yearsPro,
        //   collegeName: p.collegeName,
        //   country: p.country,
        // })
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

  console.log(results)

  if (results) {
    res.status(200).json(results)
  } else {
    res.status(400)
    throw new Error('Error executing')
  }
})

module.exports = {
  createPlayers,
  searchPlayers,
}
