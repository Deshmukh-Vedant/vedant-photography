# Production Dockerfile for Vedant Photography Backend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package definitions
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN cd backend && npm install --production

# Copy source code
COPY . .

# Set default environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV HOST=0.0.0.0

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "backend/server.js"]
