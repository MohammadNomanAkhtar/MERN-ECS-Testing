// mern/backend/db/connection.js
import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.MONGODB_URI;

if (!URI) {
  console.error("DB_ERROR: MONGODB_URI environment variable not set in backend.");
  process.exit(1);
}

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("DB_LIFECYCLE: Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error("DB_ERROR: MongoDB connection failed:", err);
  process.exit(1); // <--- IS LINE KO UNCOMMENT KAREIN
}

let db = client.db("employees");

export default db;
