const mysql = require('mysql2/promise');
const { Pool: PgPool } = require('pg');
require('dotenv').config();

let dbType = 'mysql';
let mysqlPool = null;
let pgPool = null;

const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;

async function initDB() {
  try {
    if (databaseUrl && databaseUrl.startsWith('postgres')) {
      dbType = 'postgres';
      console.log('[DB] Connecting to PostgreSQL via DATABASE_URL...');
      pgPool = new PgPool({
        connectionString: databaseUrl,
        ssl: process.env.DB_SSL === 'false' ? false : { rejectUnauthorized: false }
      });
      await initPostgresTables();
    } else {
      dbType = 'mysql';
      console.log('[DB] Connecting to MySQL...');

      if (databaseUrl && databaseUrl.startsWith('mysql')) {
        mysqlPool = mysql.createPool({
          uri: databaseUrl,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
          enableKeepAlive: true,
          keepAliveInitialDelay: 0
        });
      } else {
        mysqlPool = mysql.createPool({
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '3306', 10),
          user: process.env.DB_USER || 'root',
          password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'vedant',
          database: process.env.DB_NAME || 'student',
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
          ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
        });
      }

      const connection = await mysqlPool.getConnection();
      console.log('[DB] Connected to MySQL database successfully!');
      connection.release();

      await initMysqlTables();
    }
    return true;
  } catch (error) {
    console.error('[DB] Connection error:', error.message);
    return false;
  }
}

async function initMysqlTables() {
  const conn = await mysqlPool.getConnection();
  try {
    const dbName = process.env.DB_NAME || 'student';
    async function getColumns(tableName) {
      try {
        const [cols] = await conn.query(
          `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
          [dbName, tableName]
        );
        return cols.map(c => c.COLUMN_NAME.toLowerCase());
      } catch (e) {
        return [];
      }
    }

    // 1. web
    await conn.query(`
      CREATE TABLE IF NOT EXISTS web (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        mobileno VARCHAR(30),
        role VARCHAR(20) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    const webCols = await getColumns('web');
    if (!webCols.includes('id')) await conn.query(`ALTER TABLE web ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST`);
    if (!webCols.includes('role')) await conn.query(`ALTER TABLE web ADD COLUMN role VARCHAR(20) DEFAULT 'customer'`);
    if (!webCols.includes('created_at')) await conn.query(`ALTER TABLE web ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);

    // 2. bookdb
    await conn.query(`
      CREATE TABLE IF NOT EXISTS bookdb (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        pass VARCHAR(100),
        age INT,
        city VARCHAR(100),
        email VARCHAR(100),
        occasion VARCHAR(100) NOT NULL,
        course VARCHAR(100) NOT NULL,
        fees VARCHAR(50),
        booking_date VARCHAR(50),
        status VARCHAR(30) DEFAULT 'Pending',
        notes TEXT,
        reference_image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    const bookCols = await getColumns('bookdb');
    if (!bookCols.includes('id')) await conn.query(`ALTER TABLE bookdb ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST`);
    if (!bookCols.includes('booking_date')) await conn.query(`ALTER TABLE bookdb ADD COLUMN booking_date VARCHAR(50)`);
    if (!bookCols.includes('status')) await conn.query(`ALTER TABLE bookdb ADD COLUMN status VARCHAR(30) DEFAULT 'Pending'`);
    if (!bookCols.includes('notes')) await conn.query(`ALTER TABLE bookdb ADD COLUMN notes TEXT`);
    if (!bookCols.includes('reference_image')) await conn.query(`ALTER TABLE bookdb ADD COLUMN reference_image VARCHAR(255)`);
    if (!bookCols.includes('created_at')) await conn.query(`ALTER TABLE bookdb ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);

    // 3. contact
    await conn.query(`
      CREATE TABLE IF NOT EXISTS contact (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        subject VARCHAR(200),
        message TEXT,
        status VARCHAR(30) DEFAULT 'New',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    const contactCols = await getColumns('contact');
    if (!contactCols.includes('id')) await conn.query(`ALTER TABLE contact ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST`);
    if (!contactCols.includes('status')) await conn.query(`ALTER TABLE contact ADD COLUMN status VARCHAR(30) DEFAULT 'New'`);
    if (!contactCols.includes('created_at')) await conn.query(`ALTER TABLE contact ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);

    // 4. pay
    await conn.query(`
      CREATE TABLE IF NOT EXISTS pay (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cardno VARCHAR(50),
        exdate VARCHAR(20),
        cvvno VARCHAR(20),
        cardhname VARCHAR(100),
        amount VARCHAR(50),
        booking_id INT,
        status VARCHAR(30) DEFAULT 'Completed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    const payCols = await getColumns('pay');
    if (!payCols.includes('amount')) await conn.query(`ALTER TABLE pay ADD COLUMN amount VARCHAR(50)`);
    if (!payCols.includes('booking_id')) await conn.query(`ALTER TABLE pay ADD COLUMN booking_id INT`);
    if (!payCols.includes('status')) await conn.query(`ALTER TABLE pay ADD COLUMN status VARCHAR(30) DEFAULT 'Completed'`);

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

    console.log('[DB] MySQL tables verified & synchronized.');
  } finally {
    conn.release();
  }
}

async function initPostgresTables() {
  const client = await pgPool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS web (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        mobileno VARCHAR(30),
        role VARCHAR(20) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS bookdb (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        pass VARCHAR(100),
        age INT,
        city VARCHAR(100),
        email VARCHAR(100),
        occasion VARCHAR(100) NOT NULL,
        course VARCHAR(100) NOT NULL,
        fees VARCHAR(50),
        booking_date VARCHAR(50),
        status VARCHAR(30) DEFAULT 'Pending',
        notes TEXT,
        reference_image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS contact (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        subject VARCHAR(200),
        message TEXT,
        status VARCHAR(30) DEFAULT 'New',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS pay (
        id SERIAL PRIMARY KEY,
        cardno VARCHAR(50),
        exdate VARCHAR(20),
        cvvno VARCHAR(20),
        cardhname VARCHAR(100),
        amount VARCHAR(50),
        booking_id INT,
        status VARCHAR(30) DEFAULT 'Completed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150),
        category VARCHAR(50),
        url VARCHAR(500) NOT NULL,
        public_id VARCHAR(150),
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('[DB] PostgreSQL tables verified/initialized.');
  } finally {
    client.release();
  }
}

async function query(sql, params = []) {
  if (dbType === 'postgres') {
    let paramIndex = 1;
    const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
    const res = await pgPool.query(pgSql, params);
    return res.rows;
  } else {
    if (!mysqlPool) {
      await initDB();
    }
    const [rows] = await mysqlPool.query(sql, params);
    return rows;
  }
}

module.exports = {
  initDB,
  query,
  getDbType: () => dbType
};
