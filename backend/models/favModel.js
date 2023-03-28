const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Player',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Favorite', favoriteSchema)
