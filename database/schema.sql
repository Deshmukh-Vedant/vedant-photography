-- Vedant Photography Website & Booking System Schema
-- Compatible with MySQL 8.0+ and PostgreSQL 14+

-- 1. Users / Accounts Table (named 'web' to preserve legacy compatibility)
CREATE TABLE IF NOT EXISTS web (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    mobileno VARCHAR(30),
    role VARCHAR(20) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Photography Bookings Table (named 'bookdb' to preserve legacy compatibility)
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
);

-- 3. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200),
    message TEXT,
    status VARCHAR(30) DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Payments Table
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
);

-- 5. Uploaded Gallery Photos Table
CREATE TABLE IF NOT EXISTS images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150),
    category VARCHAR(50),
    url VARCHAR(500) NOT NULL,
    public_id VARCHAR(150),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
