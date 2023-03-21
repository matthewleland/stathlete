const mongoose = require('mongoose')

const playerSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'Please add required field'],
      unique: true,
    },
    imgUrl: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, 'Please add a first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add required field'],
    },
    fullName: {
      type: String,
      required: [true, 'Please add required field'],
    },
    pos: {
      type: String,
    },
    teamId: {
      type: Number,
    },
    teamName: {
      type: String,
    },
    jersey: {
      type: String,
    },
    birthdate: {
      type: String,
    },
    heightFeet: {
      type: String,
    },
    heightInches: {
      type: String,
    },
    weightPounds: {
      type: String,
    },
    rookieYear: {
      type: String,
    },
    yearsPro: {
      type: String,
    },
    college: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Player', playerSchema)
