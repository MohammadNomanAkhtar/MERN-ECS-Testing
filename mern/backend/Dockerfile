# Stage 1: Install dependencies and build if necessary
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install production dependencies
# If your backend has a 'build' step (e.g., TypeScript compilation), add it here
RUN npm install --production

# Copy the rest of your app's source code
COPY . .

# Stage 2: Run the application
# Yahan 'node:20-alpine' hi aayega, 'build' nahi.
FROM node:20-alpine AS production # <--- IS COMMENT KO HATA DEIN IS LINE SE

WORKDIR /app

# Copy only the necessary files from the build stage
# This includes node_modules and your application code
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .

# Expose the port your backend Express/Node.js app listens on
EXPOSE 5050

# Command to run the backend server in the foreground
# Ensure your 'start' script in package.json runs `node server.js` or similar
# that keeps the process running.
CMD ["npm", "start"]
