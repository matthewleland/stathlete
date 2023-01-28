const express = require('express')
const router = express.Router()
const { getFavorites, setFavorite, updateFavorite, deleteFavorite } = require('../controllers/favController')

const {protect} = require('../middleware/authMiddleWare')

router.route('/').get(protect, getFavorites).post(protect, setFavorite)
router.route('/:id').delete(protect, deleteFavorite).put(protect, updateFavorite)

module.exports = router