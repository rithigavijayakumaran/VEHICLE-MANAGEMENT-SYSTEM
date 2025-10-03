# Use Node LTS
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY . .

# Expose port your backend uses (example: 5000)
EXPOSE 3023

# Start the backend
CMD ["npm", "start"]
