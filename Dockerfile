# Use an official Node.js base image (or Python for simple servers)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy all files to container
COPY . .

# Install a simple HTTP server (like serve) to host static files
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Command to serve the site (assuming HTML/CSS/JS only)
CMD ["serve", "-s", "src", "-l", "3000"]
