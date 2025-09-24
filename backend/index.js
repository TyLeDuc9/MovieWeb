const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes=require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

dotenv.config();
const app = express();
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.get("/", (req, res) => {
  res.send("🎬 MovieWeb API is running...");
});
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoutes)
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/favorite', favoriteRoutes)
// Server
app.listen(8000, () => {
  console.log('🚀 Server is running on port 8000');
});
