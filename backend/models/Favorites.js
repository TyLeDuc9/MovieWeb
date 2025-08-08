const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tmdbMovieId: {
    type: Number,
    required: false
  },
  tmdbDirectorId: {
    type: Number,
    required: false
  },
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
