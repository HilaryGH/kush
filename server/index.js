const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 5000;

// Make io available to routes
app.set('io', io);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
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
// Food Delivery Routes
const ordersRoutes = require('./routes/orders');
const menuRoutes = require('./routes/menu');
const cartRoutes = require('./routes/cart');
const vendorsRoutes = require('./routes/vendors');
const ridersRoutes = require('./routes/riders');
const adminRoutes = require('./routes/admin');
const promoRoutes = require('./routes/promo');
const referralRoutes = require('./routes/referral');
const vendorRegistrationRoutes = require('./routes/vendorRegistration');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api/women-initiatives', womenInitiativesRoutes);
app.use('/api/diaspora-community', diasporaCommunityRoutes);
app.use('/api/professional-community', professionalCommunityRoutes);
app.use('/api/premium-community', premiumCommunityRoutes);
app.use('/api/invest-partner', investPartnerRoutes);
// Food Delivery Routes
app.use('/api/orders', ordersRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/vendors', vendorsRoutes);
app.use('/api/riders', ridersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/promo', promoRoutes);
app.use('/api/referral', referralRoutes);
app.use('/api/vendor-registration', vendorRegistrationRoutes);

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

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join user-specific room
  socket.on('join', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined their room`);
  });

  // Join rider room for order updates
  socket.on('join_rider', (riderId) => {
    socket.join(`rider_${riderId}`);
    console.log(`Rider ${riderId} joined their room`);
  });

  // Join vendor room for order updates
  socket.on('join_vendor', (vendorId) => {
    socket.join(`vendor_${vendorId}`);
    console.log(`Vendor ${vendorId} joined their room`);
  });

  // Location updates from rider
  socket.on('rider_location', (data) => {
    socket.to(`user_${data.userId}`).emit('rider_location_update', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, io };
