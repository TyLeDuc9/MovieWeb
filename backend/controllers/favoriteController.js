const Favorite = require('../models/Favorites');

exports.addFavorite = async (req, res) => {
  const { tmdbMovieId, tmdbDirectorId } = req.body;
  const userId = req.user.id;

  if (!tmdbMovieId && !tmdbDirectorId) {
    return res.status(400).json({ message: 'movieId hoặc directorId là bắt buộc' });
  }

  try {
    const existing = await Favorite.findOne({
      userId,
      ...(tmdbMovieId && { tmdbMovieId }),
      ...(tmdbDirectorId && { tmdbDirectorId }),
    });

    if (existing) {
      return res.status(409).json({ message: 'Đã tồn tại trong danh sách yêu thích' });
    }

    const favorite = new Favorite({ userId, tmdbMovieId, tmdbDirectorId });
    await favorite.save();

    res.status(201).json(favorite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi thêm vào yêu thích' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách yêu thích' });
  }
};

exports.removeFavorite = async (req, res) => {
  const userId = req.user.id;
  const { movieId, directorId } = req.query;

  if (!movieId && !directorId) {
    return res.status(400).json({ message: 'movieId hoặc directorId là bắt buộc' });
  }

  try {
    const deleted = await Favorite.findOneAndDelete({
      userId,
      ...(movieId && { tmdbMovieId: movieId }),
      ...(directorId && { tmdbDirectorId: directorId }),
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy để xoá' });
    }

    res.json({ message: 'Đã xóa khỏi danh sách yêu thích' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi xóa yêu thích' });
  }
};
