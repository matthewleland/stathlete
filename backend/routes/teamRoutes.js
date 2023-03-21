const express = require('express')
const router = express.Router()
const { createTeams } = require('../controllers/teamController')

const { protect } = require('../middleware/authMiddleware')

router.route('/create').post(createTeams)

module.exports = router
