import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import db from "./db/connection.js"; // Make sure this path is correct

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Check if db object is actually available and connected, if possible
// Note: 'db' from connection.js is a direct import after top-level await
// So it should be connected by the time this code runs.
app.use("/record", records);


// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    // Optional: Agar MongoDB connection ka status check karna hai
    // try {
    //   await db.command({ ping: 1 }); // Check MongoDB connection status
    //   console.log("HEALTH_CHECK_DEBUG: MongoDB ping successful from /health endpoint.");
    // } catch (dbError) {
    //   console.error("HEALTH_CHECK_DEBUG: MongoDB ping failed from /health endpoint:", dbError);
    //   return res.status(500).send("Database not reachable from health check.");
    // }

    console.log("HEALTH_CHECK_DEBUG: /health endpoint hit. Responding with 200 OK.");
    res.status(200).send("OK");
  } catch (error) {
    console.error("HEALTH_CHECK_DEBUG: Health check failed in try-catch block:", error);
    res.status(500).send("Health check failed due to internal error.");
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`SERVER_LIFECYCLE: Server listening on port ${PORT}`);
  console.log(`SERVER_LIFECYCLE: Server is now fully ready and accepting connections on port ${PORT}`);
});

// Uncaught Exception Handler
process.on('uncaughtException', (err) => {
  console.error('APP_CRASH_ERROR: UNCAUGHT EXCEPTION! Application will terminate.', err);
  process.exit(1); // Exit with a failure code
});

// Unhandled Promise Rejection Handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('APP_CRASH_ERROR: UNHANDLED REJECTION! Application will terminate.', reason);
  process.exit(1); // Exit with a failure code
});

console.log("APP_LIFECYCLE: Server.js execution started.");
