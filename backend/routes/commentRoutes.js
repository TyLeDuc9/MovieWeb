 const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { verifyToken } = require('../middlewares/authMiddleware');
router.post('/', verifyToken, commentController.createComment);
router.get('/movie/:tmdbMovieId', commentController.getCommentsByMovie);
router.get('/replies/:commentId', commentController.getReplies);
router.delete('/:id', verifyToken, commentController.deleteComment);

module.exports = router;
