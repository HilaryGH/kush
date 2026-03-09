const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kushina')
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Import Routes
const authRoutes = require('./routes/auth');
const registrationRoutes = require('./routes/registration');
const womenInitiativesRoutes = require('./routes/womenInitiatives');
const diasporaCommunityRoutes = require('./routes/diasporaCommunity');
const professionalCommunityRoutes = require('./routes/professionalCommunity');
const premiumCommunityRoutes = require('./routes/premiumCommunity');
const investPartnerRoutes = require('./routes/investPartner');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api/women-initiatives', womenInitiativesRoutes);
app.use('/api/diaspora-community', diasporaCommunityRoutes);
app.use('/api/professional-community', professionalCommunityRoutes);
app.use('/api/premium-community', premiumCommunityRoutes);
app.use('/api/invest-partner', investPartnerRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
