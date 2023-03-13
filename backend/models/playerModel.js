const mongoose = require('mongoose')

const playerSchema = mongoose.Schema(
  {
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
    displayName: {
      type: String,
      required: [true, 'Please add required field'],
    },
    playerId: {
      type: Number,
      required: [true, 'Please add required field'],
      unique: true,
    },
    teamId: {
      type: Number,
    },
    jersey: {
      type: String,
    },
    isActive: {
      type: String,
    },
    pos: {
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
    dateOfBirthUTC: {
      type: String,
    },
    teams: {
      type: Array,
    },
    draft: {
      type: Object,
    },
    nbaDebutYear: {
      type: String,
    },
    yearsPro: {
      type: String,
    },
    collegeName: {
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
