const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const storeRoutes = require('./routes/store.routes');
const ratingRoutes = require('./routes/rating.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();


app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);


app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});


app.use(errorMiddleware);

module.exports = app;
