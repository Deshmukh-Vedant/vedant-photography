const { query } = require('../config/db');

async function recordPayment(req, res) {
  try {
    const { cardno, dateno, exdate, cvvno, cardhname, cardno1, amount, booking_id } = req.body;

    const rawCard = cardno || '**** **** **** 8921';
    const maskedCard = rawCard.length > 4 ? `**** **** **** ${rawCard.slice(-4)}` : rawCard;
    const holder = cardhname || cardno1 || 'Valued Customer';
    const expDate = exdate || dateno || '12/28';
    const payAmount = amount || '₹1,200';
    const bookingId = booking_id ? parseInt(booking_id, 10) : null;

    const receiptNo = `VP-${Date.now().toString().slice(-6)}`;

    await query(
      'INSERT INTO pay (cardno, exdate, cvvno, cardhname, amount, booking_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [maskedCard, expDate, '***', holder, payAmount, bookingId, 'Completed']
    );

    return res.status(201).json({
      success: true,
      message: 'Payment processed successfully!',
      receipt: {
        receiptNumber: receiptNo,
        customerName: holder,
        paymentMethod: `Card ending in ${maskedCard.slice(-4)}`,
        amount: payAmount,
        status: 'CONFIRMED / PAID',
        date: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Payment error:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

async function getPayments(req, res) {
  try {
    const rows = await query('SELECT * FROM pay ORDER BY id DESC');
    return res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    console.error('Fetch payments error:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

module.exports = {
  recordPayment,
  getPayments
};
