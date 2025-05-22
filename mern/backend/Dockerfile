# Stage 2: Run the application
FROM node:20-alpine AS production

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .

# Expose the port your backend Express/Node.js app listens on
EXPOSE 5050

# --- TEMPORARY DEBUGGING LINES START ---
# Ensure curl is available in the production image
RUN apk add --no-cache curl

# Run the health check command directly, then start the server
# INCREASE SLEEP DURATION HERE (e.g., 15 or 20 seconds)
CMD ["/bin/sh", "-c", "echo 'Waiting 20 seconds before pre-start health check...'; sleep 20; echo 'Running verbose pre-start health check...'; curl -v -f http://localhost:5050/health && echo 'Pre-start health check passed, starting server...' && npm start || (echo 'Pre-start health check failed, exiting with curl output.'; exit 1)"]
# --- TEMPORARY DEBUGGING LINES END ---

# Original CMD (commented out for debugging)
# CMD ["npm", "start"]
