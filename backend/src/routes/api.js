const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const { register, login, getMe } = require('../controllers/authController');
const { createBooking, getBookings, updateBookingStatus, deleteBooking } = require('../controllers/bookingController');
const { submitContact, getInquiries, deleteInquiry } = require('../controllers/contactController');
const { recordPayment, getPayments } = require('../controllers/paymentController');
const { uploadImage, getGalleryImages } = require('../controllers/uploadController');
const { getStats } = require('../controllers/statsController');

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Vedant Photography Backend API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Authentication
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', getMe);

// Bookings
router.post('/bookings', createBooking);
router.get('/bookings', getBookings);
router.put('/bookings/:id/status', updateBookingStatus);
router.delete('/bookings/:id', deleteBooking);

// Contacts
router.post('/contact', submitContact);
router.get('/contact', getInquiries);
router.delete('/contact/:id', deleteInquiry);

// Payments & Receipts
router.post('/payments', recordPayment);
router.get('/payments', getPayments);

// Image Uploads & Gallery
router.post('/upload', upload.single('image'), uploadImage);
router.get('/gallery', getGalleryImages);

// Dashboard Statistics
router.get('/stats', getStats);

module.exports = router;
