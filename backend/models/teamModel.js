const mongoose = require('mongoose')

const teamSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'Please add required field'],
    },
    name: {
      type: String,
      required: [true, 'Please add required field'],
    },
    nickname: {
      type: String,
      required: [true, 'Please add required field'],
    },
    code: {
      type: String,
      required: [true, 'Please add required field'],
    },
    city: {
      type: String,
      required: [true, 'Please add required field'],
    },
    logo: {
      type: String,
    },
    players: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Team', teamSchema)
