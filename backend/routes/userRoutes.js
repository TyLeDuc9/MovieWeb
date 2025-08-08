const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, isAdmin, userController.getAllUsers);
router.get('/:id', verifyToken, isAdmin, userController.getUserById);
router.put('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser);
router.put('/:id/change-password', verifyToken, userController.changePassword);
module.exports = router;
