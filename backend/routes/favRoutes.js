const express = require('express')
const router = express.Router()
const { getFavorites, setFavorite, updateFavorite, deleteFavorite } = require('../controllers/favController')

router.route('/').get(getFavorites).post(setFavorite)
router.route('/:id').delete(deleteFavorite).put(updateFavorite)

module.exports = router