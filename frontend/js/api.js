/**
 * Vedant Photography - API Client Adapter
 */
const API = {
  getBaseUrl() {
    return (window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL) || 'http://localhost:5000';
  },

  getToken() {
    return localStorage.getItem('vp_token') || '';
  },

  getCurrentUser() {
    try {
      const u = localStorage.getItem('vp_user');
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  },

  setSession(user, token) {
    if (user) localStorage.setItem('vp_user', JSON.stringify(user));
    if (token) localStorage.setItem('vp_token', token);
  },

  clearSession() {
    localStorage.removeItem('vp_user');
    localStorage.removeItem('vp_token');
  },

  async request(endpoint, options = {}) {
    const url = `${this.getBaseUrl()}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.getToken() ? { 'Authorization': `Bearer ${this.getToken()}` } : {}),
      ...(options.headers || {})
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err.message);
      throw err;
    }
  },

  // Auth
  async register(userData) {
    const res = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    if (res.token) {
      this.setSession(res.user, res.token);
    }
    return res;
  },

  async login(credentials) {
    const res = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (res.token) {
      this.setSession(res.user, res.token);
    }
    return res;
  },

  async getMe() {
    return this.request('/api/auth/me');
  },

  // Bookings
  async createBooking(bookingData) {
    return this.request('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  },

  async getBookings(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    const endpoint = `/api/bookings${params ? `?${params}` : ''}`;
    return this.request(endpoint);
  },

  async updateBookingStatus(id, status) {
    return this.request(`/api/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  async deleteBooking(id) {
    return this.request(`/api/bookings/${id}`, {
      method: 'DELETE'
    });
  },

  // Contact
  async submitContact(contactData) {
    return this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactData)
    });
  },

  async getInquiries() {
    return this.request('/api/contact');
  },

  async deleteInquiry(id) {
    return this.request(`/api/contact/${id}`, {
      method: 'DELETE'
    });
  },

  // Payments
  async processPayment(paymentData) {
    return this.request('/api/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
  },

  // Upload
  async uploadImage(file, title, category) {
    const formData = new FormData();
    formData.append('image', file);
    if (title) formData.append('title', title);
    if (category) formData.append('category', category);

    const url = `${this.getBaseUrl()}/api/upload`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(this.getToken() ? { 'Authorization': `Bearer ${this.getToken()}` } : {})
      },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Image upload failed.');
    }
    return data;
  },

  // Stats
  async getStats() {
    return this.request('/api/stats');
  }
};

window.API = API;
