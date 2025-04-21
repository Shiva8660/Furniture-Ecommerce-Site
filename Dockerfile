# Use the official Node.js image from Docker Hub
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose the port your app will run on (e.g., 3000)
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
