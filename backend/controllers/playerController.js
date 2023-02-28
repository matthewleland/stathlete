const asyncHandler = require('express-async-handler')

const Player = require('../models/playerModel')

// @desc    Create new player
// @route   POST /api/players/create
// @access  Private
const createPlayer = asyncHandler(async (req, res) => {

  const { id, first_name, last_name, full_name } = req.body

  const player = Player.create({
    playerId: id,
    firstName: first_name,
    lastName: last_name,
    fullName: full_name
  })

  if (player) {
    res.status(201).json({
      _id: player.playerId,
      firstName: player.firstName,
      lastName: player.lastName,
      fullName: player.fullName
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const searchPlayers = asyncHandler(async (req, res) => {
  const { text } = req.body

  Player.createIndexes({ fullName: "text", fullplot: "text"})

  const query = { $text: { $search: text } }

  const projection = {
    playerId: 0,
    fullName: 1,
  };


  const results = Player.find(query).projection(projection)

  console.log(results)

  res.sendStatus(200)


})

module.exports = {
  createPlayer,
  searchPlayers
}
