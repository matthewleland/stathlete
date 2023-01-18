const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.use('/api/favorites', require('./routes/favoriteRoutes'))

app.listen(port, () => console.log(`Server listening on port ${port}...`))