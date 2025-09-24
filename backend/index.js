const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

dotenv.config();
const app = express();

// ✅ Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ✅ Route test (tránh lỗi Cannot GET /)
app.get("/", (req, res) => {
  res.send("🎬 MovieWeb API is running...");
});

// ✅ API routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/favorite', favoriteRoutes);

// ✅ Server listen (dùng PORT của Render hoặc 8000 local)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
