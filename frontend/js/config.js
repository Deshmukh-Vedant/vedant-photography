/**
 * Vedant Photography - Frontend Configuration
 * Manages API endpoint configuration for Localhost, Vercel, and Render deployments.
 */
(function (window) {
  // Check if explicit API URL is defined on window or meta tag
  const metaApi = document.querySelector('meta[name="api-base-url"]')?.getAttribute('content');
  const customApi = window.__API_URL__ || metaApi;

  // Detect environment
  const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );

  // Production Render Backend URL (user can customize this with their deployed Render service URL)
  const PRODUCTION_RENDER_API = 'https://vedant-photography-backend.onrender.com';

  const API_BASE_URL = customApi || (isLocalhost ? 'http://localhost:5000' : PRODUCTION_RENDER_API);

  window.APP_CONFIG = {
    API_BASE_URL: API_BASE_URL.replace(/\/+$/, ''), // strip trailing slash
    IS_LOCAL: isLocalhost,
    STUDIO_NAME: 'Vedant Photography',
    CONTACT_PHONE: '+91 9975298954',
    CONTACT_EMAIL: 'vedantdeshmukh331@gmail.com',
    LOCATION: 'Shegaon, Maharashtra, India'
  };

  console.log(`[Config] Vedant Photography API Target: ${window.APP_CONFIG.API_BASE_URL}`);
})(window);
