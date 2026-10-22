const { query, getDbType } = require('../config/db');

// Create a new photography booking
async function createBooking(req, res) {
  try {
    const {
      username,
      name,
      pass,
      age,
      city,
      email,
      occasion,
      course,
      fees,
      booking_date,
      notes,
      reference_image
    } = req.body;

    const bookingName = (name || username || '').trim();
    if (!bookingName || !occasion || !course) {
      return res.status(400).json({
        success: false,
        message: 'Name, occasion, and package price selection are required.'
      });
    }

    const ageVal = age ? parseInt(age, 10) : 0;
    const defaultFees = fees || 'Online Mode';
    const statusVal = 'Pending';

    let result;
    if (getDbType() === 'postgres') {
      const rows = await query(
        `INSERT INTO bookdb (name, pass, age, city, email, occasion, course, fees, booking_date, status, notes, reference_image)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
        [bookingName, pass || '', ageVal, city || '', email || '', occasion, course, defaultFees, booking_date || '', statusVal, notes || '', reference_image || '']
      );
      result = rows[0];
    } else {
      const insertResult = await query(
        `INSERT INTO bookdb (name, pass, age, city, email, occasion, course, fees, booking_date, status, notes, reference_image)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [bookingName, pass || '', ageVal, city || '', email || '', occasion, course, defaultFees, booking_date || '', statusVal, notes || '', reference_image || '']
      );
      result = { id: insertResult.insertId };
    }

    return res.status(201).json({
      success: true,
      message: 'Booking submitted successfully!',
      booking: {
        id: result ? result.id : null,
        name: bookingName,
        occasion,
        course,
        fees: defaultFees,
        status: statusVal
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

// Get all bookings (with optional filtering by email/name/occasion/status)
async function getBookings(req, res) {
  try {
    const { email, name, status, occasion } = req.query;
    let sql = 'SELECT * FROM bookdb WHERE 1=1';
    const params = [];

    if (email) {
      sql += ' AND email = ?';
      params.push(email);
    }
    if (name) {
      sql += ' AND name LIKE ?';
      params.push(`%${name}%`);
    }
    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }
    if (occasion) {
      sql += ' AND occasion = ?';
      params.push(occasion);
    }

    sql += ' ORDER BY id DESC';

    const bookings = await query(sql, params);
    return res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

// Update booking status
async function updateBookingStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'New status is required.' });
    }

    await query('UPDATE bookdb SET status = ? WHERE id = ?', [status, id]);
    return res.json({ success: true, message: `Booking #${id} updated to ${status}.` });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

// Delete booking
async function deleteBooking(req, res) {
  try {
    const { id } = req.params;
    await query('DELETE FROM bookdb WHERE id = ? OR name = ?', [id, id]);
    return res.json({ success: true, message: `Booking #${id} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus,
  deleteBooking
};
