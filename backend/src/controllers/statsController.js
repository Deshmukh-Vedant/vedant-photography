const { query } = require('../config/db');

async function getStats(req, res) {
  try {
    const totalBookingsResult = await query('SELECT COUNT(*) as count FROM bookdb');
    const pendingBookingsResult = await query("SELECT COUNT(*) as count FROM bookdb WHERE status = 'Pending'");
    const confirmedBookingsResult = await query("SELECT COUNT(*) as count FROM bookdb WHERE status = 'Confirmed' OR status = 'Completed'");
    const totalContactsResult = await query('SELECT COUNT(*) as count FROM contact');
    const totalUsersResult = await query('SELECT COUNT(*) as count FROM web');

    const totalBookings = parseInt(totalBookingsResult[0]?.count || 0, 10);
    const pendingBookings = parseInt(pendingBookingsResult[0]?.count || 0, 10);
    const confirmedBookings = parseInt(confirmedBookingsResult[0]?.count || 0, 10);
    const totalContacts = parseInt(totalContactsResult[0]?.count || 0, 10);
    const totalUsers = parseInt(totalUsersResult[0]?.count || 0, 10);

    return res.json({
      success: true,
      data: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        totalContacts,
        totalUsers,
        estimatedRevenue: '₹' + (totalBookings * 12500).toLocaleString('en-IN')
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

module.exports = {
  getStats
};
