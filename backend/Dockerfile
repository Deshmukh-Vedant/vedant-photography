# Production Dockerfile for Vedant Photography Backend
FROM node:18-alpine

WORKDIR /app

# Copy package definitions
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy backend source
COPY . .

# Set default environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV HOST=0.0.0.0

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
