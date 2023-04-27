const express = require('express')
const router = express.Router()
const {
  createTeams,
  searchTeams,
  getTeamDetails,
} = require('../controllers/teamController')

const { protect } = require('../middleware/authMiddleware')

router.route('/create').post(createTeams)
router.route('/search').get(searchTeams)
router.route('/:id').get(getTeamDetails)

module.exports = router
