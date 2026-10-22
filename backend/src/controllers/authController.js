const { query } = require('../config/db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'vedant_photography_super_secret_jwt_key_2026';

// Customer / Admin Registration
async function register(req, res) {
  try {
    const { user, name, pass, password, email, number, mobileno } = req.body;
    const userName = (name || user || '').trim();
    const userPass = (password || pass || '').trim();
    const userEmail = (email || '').trim().toLowerCase();
    const userPhone = (mobileno || number || '').trim();

    if (!userName || !userPass) {
      return res.status(400).json({ success: false, message: 'Name/Username and password are required.' });
    }

    // Check if user or email already exists
    const existing = await query('SELECT id, name, email FROM web WHERE email = ? OR name = ?', [userEmail, userName]);
    if (existing && existing.length > 0) {
      return res.status(409).json({ success: false, message: 'A user with this name or email already exists. Please log in.' });
    }

    // Insert new user
    await query(
      'INSERT INTO web (name, password, email, mobileno, role) VALUES (?, ?, ?, ?, ?)',
      [userName, userPass, userEmail, userPhone, 'customer']
    );

    // Create session token
    const token = jwt.sign(
      { name: userName, email: userEmail, role: 'customer' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: { name: userName, email: userEmail, mobileno: userPhone, role: 'customer' },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

// Customer / Admin Login
async function login(req, res) {
  try {
    const { name, user, pass, password } = req.body;
    const identifier = (name || user || '').trim();
    const passInput = (password || pass || '').trim();

    if (!identifier || !passInput) {
      return res.status(400).json({ success: false, message: 'Username/Email and password are required.' });
    }

    // Check admin credentials
    if ((identifier === 'admin' || identifier === 'vedant') && passInput === 'admin123') {
      const adminToken = jwt.sign(
        { name: 'Vedant Deshmukh (Admin)', email: 'admin@vedantphotography.com', role: 'admin' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.json({
        success: true,
        message: 'Welcome back Admin!',
        user: { name: 'Vedant Deshmukh', email: 'admin@vedantphotography.com', role: 'admin' },
        token: adminToken
      });
    }

    // Find in web table
    const rows = await query(
      'SELECT id, name, password, email, mobileno, role FROM web WHERE (name = ? OR email = ?) AND password = ?',
      [identifier, identifier, passInput]
    );

    if (!rows || rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid username/email or password.' });
    }

    const matchedUser = rows[0];
    const userRole = (matchedUser.name && matchedUser.name.toLowerCase().includes('vedant')) ? 'admin' : (matchedUser.role || 'customer');

    const token = jwt.sign(
      { id: matchedUser.id, name: matchedUser.name, email: matchedUser.email, role: userRole },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful!',
      user: {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        mobileno: matchedUser.mobileno,
        role: userRole
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

// Get current profile
async function getMe(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No authorization token provided.' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ success: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
}

module.exports = {
  register,
  login,
  getMe
};
