const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/favorites', require('./routes/favRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

const port = process.env.PORT || 8001
app.listen(port, () => console.log(`\nServer listening on port ${port}...`.magenta))

