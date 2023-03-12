const asyncHandler = require('express-async-handler')
const { models } = require('mongoose')

const Player = require('../models/playerModel')

// @desc    Create new player
// @route   POST /api/players/create
// @access  Private
const createPlayer = asyncHandler(async (req, res) => {

  const { id, first_name, last_name, full_name } = req.body

  const player = await Player.create({
    playerId: id,
    firstName: first_name,
    lastName: last_name,
    fullName: full_name
  })

  if (player) {
    res.status(201).json(player)
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const searchPlayers = asyncHandler(async (req, res) => {
  const { text } = req.body

  const results = await models.Player.find({
    fullName: new RegExp(`.*${text}.*`, 'i') 
  })

  console.log(results)

  if (results) {
    res.status(200).json(results)
  } else {
    res.status(400)
    throw new Error('Error executign')
  }
  
})

module.exports = {
  createPlayer,
  searchPlayers
}
