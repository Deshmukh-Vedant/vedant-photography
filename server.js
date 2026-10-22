/**
 * Root Server Entry Point for Cloud Deployments (Render, Railway, Heroku)
 * Automatically delegates to backend/server.js
 */
const path = require('path');
const fs = require('fs');

const backendNodeModules = path.join(__dirname, 'backend', 'node_modules');
if (fs.existsSync(backendNodeModules)) {
  module.paths.push(backendNodeModules);
}

// Delegate to backend server
require('./backend/server.js');
