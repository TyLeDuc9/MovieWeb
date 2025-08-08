const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'unknown'],
        default: 'unknown',
        required:false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
