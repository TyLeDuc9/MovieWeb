const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ message: 'Email đã tồn tại' });
        if (password.length < 2) {
            return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 2 ký tự' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role: role || 'user'
        });
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        console.log("Register error:", err);
        res.status(500).json({ error: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existUser = await User.findOne({ email });
        if (!existUser)
            return res.status(400).json({ message: 'Tài khoản chưa đăng ký' });

        const checkPassword = await bcrypt.compare(password, existUser.password);
        if (!checkPassword)
            return res.status(400).json({ message: 'Mật khẩu không đúng' });
        const token = jwt.sign({ id: existUser._id, role: existUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token,
            user: {
                id: existUser._id,
                email: existUser.email,
                name: existUser.name,      
                gender: existUser.gender,
                role: existUser.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
