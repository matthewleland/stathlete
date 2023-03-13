const express = require('express')
const router = express.Router()
const {
  createPlayers,
  searchPlayers,
} = require('../controllers/playerController')

const { protect } = require('../middleware/authMiddleware')

router.route('/create').post(createPlayers)
router.route('/search').get(searchPlayers)

module.exports = router
