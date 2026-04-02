const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../utils/email');

// Sign In
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    console.log('Sign in attempt for email:', normalizedEmail);

    // Find user (all users including vendors use the same User model with different roles)
    // Use case-insensitive email search
    const user = await User.findOne({ email: normalizedEmail });
    
    if (!user) {
      // Check if there's an orphaned vendor record (vendor exists but no user)
      const Vendor = require('../models/Vendor');
      const orphanedVendor = await Vendor.findOne({ email: normalizedEmail });
      if (orphanedVendor) {
        console.log('Found orphaned vendor record for email:', normalizedEmail);
        // Clean up orphaned vendor
        await Vendor.findByIdAndDelete(orphanedVendor._id);
        console.log('Cleaned up orphaned vendor record');
      }
      console.log('User not found for email:', normalizedEmail);
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    console.log('User found:', {
      id: user._id,
      email: user.email,
      role: user.role,
      hasPassword: !!user.password,
      passwordLength: user.password?.length
    });

    // Check if password field exists and is valid
    if (!user.password) {
      console.error('User has no password set:', user._id);
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      console.log('Password mismatch for user:', user._id);
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Allow all users to sign in regardless of registration status
    // Users can now login even if their registration is pending approval

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Sign in successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Generate unique 4-digit referral code
const generateReferralCode = async () => {
  let referralCode;
  let isUnique = false;
  
  while (!isUnique) {
    // Generate 4 random digits (1000-9999)
    referralCode = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Check if code already exists
    const existingUser = await User.findOne({ referralCode });
    if (!existingUser) {
      isUnique = true;
    }
  }
  
  return referralCode;
};

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { email, password, fullName, phone, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Allow all known roles for direct API usage (e.g. Thunder Client).
    // Frontend registration UI should still only expose: user, vendor, rider.
    const adminRoles = ['superadmin', 'admin', 'support', 'marketing'];
    const publicRoles = ['user', 'vendor', 'rider'];
    const allowedRoles = [...publicRoles, ...adminRoles];

    const requestedRole = typeof role === 'string' ? role.toLowerCase().trim() : '';
    const normalizedRole = allowedRoles.includes(requestedRole) ? requestedRole : 'user';

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique 4-digit referral code
    const referralCode = await generateReferralCode();

    // Create user (direct signups are automatically approved)
    const user = new User({
      email,
      password: hashedPassword,
      fullName,
      phone,
      referralCode,
      registrationStatus: 'approved', // Direct signups are auto-approved
      registrationType: 'direct-signup',
      role: normalizedRole,
    });

    await user.save();

    // Send welcome email with referral code (don't wait for it to complete)
    sendWelcomeEmail(email, fullName, referralCode).catch((error) => {
      console.error('Failed to send welcome email:', error);
      // Don't fail the registration if email fails
    });

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        referralCode: user.referralCode,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
