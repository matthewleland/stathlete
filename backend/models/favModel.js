const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    details: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Favorite', favoriteSchema)
