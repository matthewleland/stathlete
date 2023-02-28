const express = require('express')
const {spawn} = require('child_process')
const {PythonShell} = require('python-shell')
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

app.use('/api/players', require('./routes/playerRoutes'))

// let options = {
//   pythonPath: '/home/matthewleland/anaconda3/bin/python'
// }

// app.get('/api/players/analytics', (req, res) => {
//   let pyshell = new PythonShell('backend/analytics/scripts/player.py', options);
  
//   pyshell.on('message', function (message) {
//     res.send(message)
//   });
  
//   // end the input stream and allow the process to exit
//   pyshell.end(function (err,code,signal) {
//     if (err) throw err;
//     console.log('The exit code was: ' + code);
//     console.log('The exit signal was: ' + signal);
//     console.log('finished');
//   });
// })

app.use(errorHandler)

const port = process.env.PORT || 8001
app.listen(port, () => console.log(`\nServer listening on port ${port}...`.magenta))

