const { query } = require('../config/db');

async function submitContact(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    await query(
      'INSERT INTO contact (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), email.trim(), (subject || 'General Inquiry').trim(), message.trim(), 'New']
    );

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received! Vedant Photography will contact you shortly.'
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

async function getInquiries(req, res) {
  try {
    const inquiries = await query('SELECT * FROM contact ORDER BY id DESC');
    return res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    console.error('Fetch contact error:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

async function deleteInquiry(req, res) {
  try {
    const { id } = req.params;
    await query('DELETE FROM contact WHERE id = ?', [id]);
    return res.json({ success: true, message: `Inquiry #${id} removed.` });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

module.exports = {
  submitContact,
  getInquiries,
  deleteInquiry
};
