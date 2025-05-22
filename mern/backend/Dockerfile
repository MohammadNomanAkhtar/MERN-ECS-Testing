# Stage 1: Install dependencies and build if necessary
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the rest of your app's source code
COPY . .

# Stage 2: Run the application
FROM node:20-alpine AS production

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .

# Expose the port your backend Express/Node.js app listens on
EXPOSE 5050

# --- REMOVE ALL TEMPORARY DEBUGGING LINES HERE ---
# Ensure curl is available in the production image (Agar zaroori ho toh yeh line permanent rakh sakte hain)
RUN apk add --no-cache curl

# Command to run the backend server in the foreground (YEHI ASLI CMD HAI)
CMD ["npm", "start"]
