# 📸 Vedant Photography Website & Order Booking System

A full-stack, responsive photography portfolio and client booking management platform built for **Vedant Photography** (established 2005 in Shegaon, Maharashtra).

This repository contains both the legacy Java/JSP project (fully repaired) and the modern decoupled **Frontend (Vercel-ready)** and **Backend API (Render-ready)** with **MySQL & PostgreSQL** database support.

---

## 🌟 Architecture & Features

### 🖥️ Frontend (Vercel Ready)
- **Framework / Runtime:** Pure Vanilla HTML5, CSS3, JavaScript (ES6+), Bootstrap 5.3, GLightbox, Swiper, Bootstrap Icons.
- **Pages & Routes:**
  - `index.html`: Studio Hero, About highlights, popular packages, live client statistics, testimonial highlights, and quick CTAs.
  - `gallery.html`: Interactive multi-category portfolio gallery with client-side category filtering (Marriage, Pre-Wedding, Baby-Shower, Nature, Sports, Travel) and high-resolution GLightbox zoom modals.
  - Category Portfolios: `marriage.html`, `prewedding.html`, `babyshower.html`, `nature.html`, `sports.html`, `travel.html`.
  - `book.html`: Complete Photography Order Booking System with live package price calculation, date picker, occasion selector, online/offline payment mode preference, and optional reference photo upload.
  - `receipt.html`: Professional printable booking and payment confirmation receipt.
  - `admin.html`: Executive Order Management Dashboard with real-time KPI metrics, searchable and filterable booking tables, instant order status updates (Pending, Confirmed, Completed, Cancelled), client contact inquiry viewer, and direct gallery photo uploader.
  - `login.html` & `signup.html`: Customer and Admin authentication with token storage.
  - `contact.html`: Direct studio inquiry form with live API feedback.
- **API Integration (`frontend/js/api.js` & `config.js`):** Automatically targets `localhost:5000` during local development and dynamically points to the deployed Render backend URL in production.
- **Vercel Config (`vercel.json`):** Clean URL rewrites (`/book` serves `book.html`), security headers, and output directory configured to `frontend`.

### ⚙️ Backend API (Render Ready)
- **Runtime:** Node.js 18+ / Express.js.
- **Port & Host:** Dynamically binds to `0.0.0.0:${PORT || 5000}`.
- **CORS:** Pre-configured for Vercel preview domains (`*.vercel.app`), custom domains, and localhost.
- **Database Engine (`backend/src/config/db.js`):**
  - Universal connector supporting **MySQL** (local `localhost:3306/student` or cloud MySQL like Aiven/PlanetScale) and **PostgreSQL** (Render Managed PostgreSQL).
  - Automatically verifies and synchronizes table schemas on startup with 0 data loss.
- **Image Storage (`backend/src/middleware/upload.js`):** Multer handling with persistent local disk storage and optional Cloudinary cloud storage integration.
- **Health Check Endpoint:** `GET /health` and `GET /api/health`.

### 🗄️ Database
- Original legacy database: MySQL 8.0 `student` database.
- Schema preserved & upgraded:
  - `web`: User accounts (`id`, `name`, `password`, `email`, `mobileno`, `role`, `created_at`).
  - `bookdb`: Booking orders (`id`, `name`, `pass`, `age`, `city`, `email`, `occasion`, `course`, `fees`, `booking_date`, `status`, `notes`, `reference_image`, `created_at`).
  - `contact`: Client inquiries (`id`, `name`, `email`, `subject`, `message`, `status`, `created_at`).
  - `pay`: Payment logs (`id`, `cardno`, `exdate`, `cvvno`, `cardhname`, `amount`, `booking_id`, `status`, `created_at`).
  - `images`: Gallery uploads (`id`, `title`, `category`, `url`, `public_id`, `uploaded_at`).
- Exported existing data safely stored in `database/seed_existing_data.sql`.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js v18+ & npm
- MySQL Server (optional, running on port 3306 with database `student`)

### 1. Start the Backend API
```bash
cd backend
npm install
npm start
```
The backend will boot up at `http://localhost:5000`:
- Health check: `http://localhost:5000/health`
- API root: `http://localhost:5000/api`

### 2. Run Verification Tests
```bash
cd backend
npm test
```
All 10 automated test suites will run, validating authentication, booking creation, payment logging, and business KPIs.

### 3. Open the Frontend
Simply open `frontend/index.html` in your browser (or use VS Code Live Server / `npx serve frontend -p 3000`).

---

## ☁️ Deployment Guide

### A. Deploy Backend to Render

1. **Push your code to GitHub** (see GitHub section below).
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New + > Web Service**.
3. Select your GitHub repository.
4. Configure service settings:
   - **Name:** `vedant-photography-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. In **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `CORS_ORIGIN`: `*` (or your Vercel frontend URL once deployed)
   - `JWT_SECRET`: A secure random string (e.g. `vedant_photography_jwt_secret_2026`)
   - `DATABASE_URL`: Your cloud database URL:
     - **Free MySQL Option:** Create a free MySQL database on [Aiven](https://aiven.io/) or [Clever Cloud](https://www.clever-cloud.com/) and paste the connection string: `mysql://user:pass@host:port/dbname`.
     - **Render PostgreSQL Option:** Click **New + > PostgreSQL** on Render, copy the Internal/External Database URL, and paste it here.
6. Click **Create Web Service**.
7. Once deployed, note down your Render URL (e.g. `https://vedant-photography-backend.onrender.com`).
8. Test health endpoint: `https://<YOUR-RENDER-URL>/health`.

---

### B. Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/) and click **Add New > Project**.
2. Import your GitHub repository.
3. Configure project settings:
   - **Framework Preset:** `Other`
   - **Root Directory:** `frontend` (or `./` because root `vercel.json` automatically outputs `frontend`)
   - **Build Command:** (Leave blank)
   - **Output Directory:** (Leave blank)
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL`: `https://<YOUR-RENDER-URL>` (your deployed Render backend URL)
5. Click **Deploy**.
6. Once deployed, open `frontend/js/config.js` or specify the meta tag to point to your live Render backend URL:
   ```html
   <meta name="api-base-url" content="https://<YOUR-RENDER-URL>">
   ```
   Or update the `PRODUCTION_RENDER_API` constant in `frontend/js/config.js`.

---

## 📡 API Endpoint Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/health` | Server health and uptime check | No |
| `POST` | `/api/auth/register` | Register new customer/admin | No |
| `POST` | `/api/auth/login` | Authenticate customer/admin | No |
| `GET` | `/api/auth/me` | Fetch currently logged-in user | Yes (Bearer) |
| `GET` | `/api/bookings` | List all bookings / filter by query | No |
| `POST` | `/api/bookings` | Create new photography shoot booking | No |
| `PUT` | `/api/bookings/:id/status` | Update booking status (`Pending`/`Confirmed`/etc.) | No |
| `DELETE` | `/api/bookings/:id` | Cancel/delete booking order | No |
| `GET` | `/api/contact` | Fetch all client inquiries | No |
| `POST` | `/api/contact` | Submit client contact message | No |
| `DELETE` | `/api/contact/:id` | Delete inquiry message | No |
| `POST` | `/api/payments` | Record payment & generate receipt | No |
| `POST` | `/api/upload` | Upload portfolio / reference photo | No |
| `GET` | `/api/stats` | Get KPI metrics for Admin Dashboard | No |

---

## 🔒 Security & Best Practices
- **No Committed Secrets:** Database credentials, JWT secrets, and API keys are strictly loaded via `.env` and excluded via `.gitignore`.
- **SQL Injection Prevention:** All SQL queries use parameterized prepared statements (`?` / `$1`).
- **Input Sanitization & Escaping:** All client outputs are sanitized against Cross-Site Scripting (XSS).
- **Graceful Database Fallback:** Automatic table verification and schema expansion ensures no crashes if older schemas lack certain columns.

---

## 👨‍💼 Admin Access
To access the Admin Dashboard:
1. Navigate to `/admin.html` on the frontend.
2. Sign in with the admin credentials:
   - **Username:** `admin` or `vedant`
   - **Password:** `admin123`
3. You can review all customer orders, update appointment statuses, view messages, and upload new photos to the gallery.

---

&copy; 2005 - 2026 Vedant Photography Studio &bull; Shegaon, Maharashtra.
