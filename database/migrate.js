const mysql = require('../backend/node_modules/mysql2/promise');
require('../backend/node_modules/dotenv').config({ path: require('path').join(__dirname, '../backend/.env') });

async function migrate() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'vedant',
    database: process.env.DB_NAME || 'student'
  });

  const conn = await pool.getConnection();
  console.log('[Migration] Connected to MySQL database:', process.env.DB_NAME || 'student');

  async function getColumns(table) {
    const [cols] = await conn.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
      [process.env.DB_NAME || 'student', table]
    );
    return cols.map(c => c.COLUMN_NAME.toLowerCase());
  }

  // 1. web
  const webCols = await getColumns('web');
  if (!webCols.includes('id')) {
    console.log('[Migration] Adding id column to web table...');
    await conn.query(`ALTER TABLE web ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST`);
  }
  if (!webCols.includes('role')) {
    await conn.query(`ALTER TABLE web ADD COLUMN role VARCHAR(20) DEFAULT 'customer'`);
  }
  if (!webCols.includes('created_at')) {
    await conn.query(`ALTER TABLE web ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
  }

  // 2. bookdb
  const bookCols = await getColumns('bookdb');
  if (!bookCols.includes('id')) {
    console.log('[Migration] Adding id column to bookdb table...');
    await conn.query(`ALTER TABLE bookdb ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST`);
  }
  if (!bookCols.includes('booking_date')) {
    await conn.query(`ALTER TABLE bookdb ADD COLUMN booking_date VARCHAR(50)`);
  }
  if (!bookCols.includes('status')) {
    await conn.query(`ALTER TABLE bookdb ADD COLUMN status VARCHAR(30) DEFAULT 'Pending'`);
  }
  if (!bookCols.includes('notes')) {
    await conn.query(`ALTER TABLE bookdb ADD COLUMN notes TEXT`);
  }
  if (!bookCols.includes('reference_image')) {
    await conn.query(`ALTER TABLE bookdb ADD COLUMN reference_image VARCHAR(255)`);
  }
  if (!bookCols.includes('created_at')) {
    await conn.query(`ALTER TABLE bookdb ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
  }

  // 3. contact
  const contactCols = await getColumns('contact');
  if (!contactCols.includes('id')) {
    console.log('[Migration] Adding id column to contact table...');
    await conn.query(`ALTER TABLE contact ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST`);
  }
  if (!contactCols.includes('status')) {
    await conn.query(`ALTER TABLE contact ADD COLUMN status VARCHAR(30) DEFAULT 'New'`);
  }
  if (!contactCols.includes('created_at')) {
    await conn.query(`ALTER TABLE contact ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
  }

  // 4. pay
  const payCols = await getColumns('pay');
  if (!payCols.includes('id')) {
    await conn.query(`ALTER TABLE pay ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST`);
  }
  if (!payCols.includes('amount')) {
    await conn.query(`ALTER TABLE pay ADD COLUMN amount VARCHAR(50)`);
  }
  if (!payCols.includes('booking_id')) {
    await conn.query(`ALTER TABLE pay ADD COLUMN booking_id INT`);
  }
  if (!payCols.includes('status')) {
    await conn.query(`ALTER TABLE pay ADD COLUMN status VARCHAR(30) DEFAULT 'Completed'`);
  }

  // 5. images
  await conn.query(`
    CREATE TABLE IF NOT EXISTS images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(150),
      category VARCHAR(50),
      url VARCHAR(500) NOT NULL,
      public_id VARCHAR(150),
      uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('[Migration] Migration completed successfully! All columns aligned with 0 data loss.');
  conn.release();
  await pool.end();
}

migrate().catch(err => {
  console.error('[Migration] Failed:', err);
  process.exit(1);
});
