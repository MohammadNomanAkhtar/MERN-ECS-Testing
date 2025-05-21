import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import db from "./db/connection.js"; // Make sure this path is correct

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    // Optionally, check if database connection is active
    // if (db.readyState !== 1) { // Mongoose example
    //   return res.status(500).send('Database not connected');
    // }
    res.status(200).send("OK");
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).send("Health check failed.");
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
