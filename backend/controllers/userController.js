const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) return res.status(404).json({ message: 'User không tồn tại' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, role, gender } = req.body;
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Không có quyền sửa user khác' });
    }
    const updateData = { name, email, gender, role };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    const updated = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }
    const { password: _, ...userWithoutPassword } = updated.toObject();
    res.json({ message: 'Cập nhật thành công', user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy user' });

    res.json({ message: 'Xóa user thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const userId = req.params.id;
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Mật khẩu xác nhận không khớp' });
  }
  try {
    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
    res.status(200).json({ message: 'Đổi mật khẩu thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};
