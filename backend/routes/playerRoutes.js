const express = require('express')
const router = express.Router()
const {
  createPlayers,
  searchPlayers,
  getPlayerDetails,
} = require('../controllers/playerController')

const { protect } = require('../middleware/authMiddleware')

router.route('/create').post(createPlayers)
router.route('/search').get(searchPlayers)
router.route('/:id').get(getPlayerDetails)

module.exports = router
