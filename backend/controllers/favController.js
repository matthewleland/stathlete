const asyncHandler = require('express-async-handler')

const Favorite = require('../models/favModel')

// @desc    Get favorites
// @route   GET /api/favorites
// @access  Private

const getFavorites = asyncHandler(async (req, res) => {
    const favorites = await Favorite.find(favorites)
    res.status(200).json({ message: 'Get favorites' })
})

// @desc    Set favorite
// @route   POST /api/favorites
// @access  Private

const setFavorite = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const favorite = await Favorite.create({
        text: req.body.text
    })


    res.status(200).json({favorite})
})

// @desc    Update favorite
// @route   PUT /api/favorites/:id
// @access  Private

const updateFavorite = asyncHandler(async (req, res) => {
    const favorite = await Favorite.findById(req.params.id)

    if(!favorite) {
        res.status(400)
        throw new Error('Favorite not found')

    }
    const updatedFavorite = await Favorite.findByIdAndUpdate(req.params.id, req.
        body, 
        {new: true,
        })
    res.status(200).json(updatedFavorite)
})

// @desc    Delete favorite
// @route   DELETE /api/favorites/:id
// @access  Private

const deleteFavorite = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete favorite ${req.params.id}` })
})

module.exports = {
    getFavorites,
    setFavorite,
    updateFavorite,
    deleteFavorite
}