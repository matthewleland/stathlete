const express = require('express')
const dotenv = require('dotenv').config()

const app = express()

app.get('/api/favorites', (req, res) => {
  res.status(200).json({ message: 'Get Favorites'})
})

const port = process.env.PORT || 5001
app.listen(port, () => console.log(`Server listening on port ${port}...`))