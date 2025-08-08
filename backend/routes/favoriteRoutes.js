const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Không cần truyền :userId nữa, vì đã có verifyToken
router.post('/', verifyToken, favoriteController.addFavorite);
router.get('/', verifyToken, favoriteController.getFavorites);
router.delete('/', verifyToken, favoriteController.removeFavorite);

module.exports = router;
