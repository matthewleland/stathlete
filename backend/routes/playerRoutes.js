const express = require('express')
const router = express.Router()
const { createPlayer, searchPlayers } = require('../controllers/playerController')

const { protect } = require('../middleware/authMiddleware')

router.route('/create').post(createPlayer)
router.route('/search').get(searchPlayers)

module.exports = router