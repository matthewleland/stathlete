const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
  playerId: {
    type: String,
    required: [true, 'Please add an id'],
    unique: true
  },
  firstName: {
    type: String,
    required: [true, 'Please add a first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
    unique: true
  },
  fullName: {
    type: String,
    required: [true, 'Please add a last name'],
    unique: true
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Player', playerSchema)