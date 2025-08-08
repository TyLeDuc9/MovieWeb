const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tmdbMovieId: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500
  },
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null 
  }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
