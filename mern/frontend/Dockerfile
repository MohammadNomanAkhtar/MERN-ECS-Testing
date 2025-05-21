# Stage 1: Build the React application
# Using a more recent Node.js version and Alpine for a smaller image
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Generate the production build of your React app
RUN npm run build # This command typically outputs optimized files to a 'dist' folder

# Stage 2: Serve the built application with a lightweight static server
# Start fresh with a small base image for the final production image
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /app

# Copy the built assets from the 'build' stage
COPY --from=build /app/dist ./dist

# Install a simple, lightweight static file server globally
# 'serve' is a popular choice for this purpose
RUN npm install -g serve

# Command to serve the built application in the foreground
# '-s dist' tells 'serve' to serve files from the 'dist' directory
# '-l tcp://0.0.0.0:5173' tells 'serve' to listen on all network interfaces on port 5173
# This command keeps the container alive
CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:5173"]

# Inform Docker that the container listens on this port at runtime
EXPOSE 5173
