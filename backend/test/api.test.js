const assert = require('assert');

const BASE_URL = process.env.TEST_URL || 'http://localhost:5000';

async function runTests() {
  console.log(`\n🧪 Starting Vedant Photography API Verification Tests on ${BASE_URL}...\n`);
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name} ->`, err.message);
      failed++;
    }
  }

  // 1. Health Check
  await test('GET /health returns healthy status', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'healthy');
  });

  // 2. Register User
  const testUser = `testuser_${Date.now()}`;
  const testEmail = `${testUser}@example.com`;
  let token = '';

  await test('POST /api/auth/register creates a new user', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: testUser,
        pass: 'testpass123',
        email: testEmail,
        number: '9876543210'
      })
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.token);
    token = data.token;
  });

  // 3. Login
  await test('POST /api/auth/login authenticates registered user', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: testUser,
        pass: 'testpass123'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.user.name, testUser);
  });

  // 4. Get Current User Profile
  await test('GET /api/auth/me returns current user info', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.user.name, testUser);
  });

  // 5. Create Booking
  let bookingId = null;
  await test('POST /api/bookings creates photography booking', async () => {
    const res = await fetch(`${BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: testUser,
        age: 25,
        city: 'Mumbai',
        email: testEmail,
        occasion: 'Marriage',
        course: 'Marriage 55,500Rs/-',
        fees: 'Online Mode',
        booking_date: '2026-12-15'
      })
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.booking);
    bookingId = data.booking.id;
  });

  // 6. Fetch Bookings
  await test('GET /api/bookings returns bookings list', async () => {
    const res = await fetch(`${BASE_URL}/api/bookings?email=${testEmail}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.ok(data.data.length >= 1);
  });

  // 7. Update Booking Status
  await test('PUT /api/bookings/:id/status updates status', async () => {
    if (!bookingId) {
      // Find latest booking id
      const listRes = await fetch(`${BASE_URL}/api/bookings?email=${testEmail}`);
      const listData = await listRes.json();
      bookingId = listData.data[0].id;
    }
    const res = await fetch(`${BASE_URL}/api/bookings/${bookingId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Confirmed' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
  });

  // 8. Submit Contact Message
  await test('POST /api/contact submits an inquiry', async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Aarav Patel',
        email: 'aarav@example.com',
        subject: 'Wedding Shoot Inquiry',
        message: 'Looking for a pre-wedding and marriage photoshoot in December.'
      })
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
  });

  // 9. Process Payment
  await test('POST /api/payments records payment receipt', async () => {
    const res = await fetch(`${BASE_URL}/api/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cardno: '4532111122228921',
        cardhname: 'Aarav Patel',
        amount: '₹55,500',
        booking_id: bookingId
      })
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.receipt.status, 'CONFIRMED / PAID');
  });

  // 10. Dashboard Stats
  await test('GET /api/stats returns business KPIs', async () => {
    const res = await fetch(`${BASE_URL}/api/stats`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.data.totalBookings >= 1);
  });

  console.log(`\n===============================================`);
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`===============================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
