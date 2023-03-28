const asyncHandler = require('express-async-handler')
const { models, model } = require('mongoose')

const Favorite = require('../models/favModel')
const User = require('../models/userModel')
const Player = require('../models/playerModel')

// @desc    Get favorites
// @route   GET /api/favorites
// @access  Private
const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user: req.user.id })

  //get specific users goal through an object which is user:
  res.status(200).json(favorites)
})

// @desc    Set favorite
// @route   POST /api/favorites
// @access  Private
const setFavorite = asyncHandler(async (req, res) => {
  // if(!req.body.text) {
  //     res.status(400)
  //     throw new Error('Please add a text field')
  // }
  // const favorite = await Favorite.create({
  //     text: req.body.text,
  //     user: req.user.id
  // })

  if (!req.body.player.id) {
    res.status(400)
    throw new Error('Please add a playerId')
  }

  const player = await models.Player.findOne({
    id: req.body.player.id,
  })

  console.log(player)
  console.log(req.user)

  //   const favorite = await Favorite.create({
  //     playerId: req.body.playerId,
  //     user: req.user.id,
  //   })
  console.log(req.user.id)

  const results = await Player.updateOne(
    { _id: req.user.id },
    {
      $push: {
        favorites: {
          player: {
            id: player.id,
            fullName: player.fullName,
          },
        },
      },
    }
  )

  console.log(results)

  res.status(200).json(results)
})

// @desc    Update favorite
// @route   PUT /api/favorites/:id
// @access  Private
const updateFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findById(req.params.id)

  if (!favorite) {
    res.status(400)
    throw new Error('Favorite not found')
  }

  //checking for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Make sure the log in users matches the favorites id user
  if (favorite.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedFavorite = await Favorite.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )
  res.status(200).json(updatedFavorite)
})

// @desc    Delete favorite
// @route   DELETE /api/favorites/:id
// @access  Private
const deleteFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findById(req.params.id)
  if (!favorite) {
    res.status(400)
    throw new Error('Favorite not found')
  }

  //checking for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Make sure the log in users matches the favorites id user
  if (favorite.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await favorite.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getFavorites,
  setFavorite,
  updateFavorite,
  deleteFavorite,
}
