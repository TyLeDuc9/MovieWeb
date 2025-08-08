const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const { content, tmdbMovieId, parentCommentId } = req.body;
    const userId = req.user?.id || req.user?._id; 
    const newComment = new Comment({
      userId,
      content,
      tmdbMovieId,
      parentCommentId: parentCommentId || null,
    });

    const saved = await newComment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error in createComment:", err); 
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentsByMovie = async (req, res) => {
  try {
    const { tmdbMovieId } = req.params;

    const comments = await Comment.find({
      tmdbMovieId: tmdbMovieId,
      parentCommentId: null,
    })
      .populate('userId', 'name avatar') 
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReplies = async (req, res) => {
  try {
    const { commentId } = req.params;

    const replies = await Comment.find({
      parentCommentId: commentId,
    }).populate('userId', 'name role');

    res.json(replies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteComment = async (req, res) => {
  const userId = req.user.id;
  const isAdmin = req.user.role === 'admin';
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment không tồn tại' });

    if (comment.userId.toString() !== userId && !isAdmin) {
      return res.status(403).json({ message: 'Không có quyền xóa comment này' });
    }

    await comment.deleteOne();
    res.json({ message: 'Xoá comment thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
