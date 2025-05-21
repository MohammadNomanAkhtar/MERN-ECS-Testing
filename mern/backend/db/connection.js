import { MongoClient, ServerApiVersion } from "mongodb";

// Pehle yeh line thi:
// const URI = "mongodb://mongodb:27017";

// AB YEH KARNA HAI:
const URI = process.env.MONGODB_URI; // <--- Yeh line environment variable se read karegi

// Bohut zaroori hai ke hum check karein ke URI set hai ya nahin
if (!URI) {
  console.error("Error: MONGODB_URI environment variable not set in backend.");
  process.exit(1); // Agar URI nahin mili toh application ko exit kar do
}


const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error("MongoDB connection failed:", err); // Error message ko behtar banaya
  // Yahan aapko ensure karna hai ke connection fail hone par server band ho jaye
  // ya process exit ho jaye takay ECS task unhealthy ho.
  // process.exit(1); // Agar zarurat pade toh yeh line uncomment kar sakte hain
}

let db = client.db("employees"); // Aapki database ka naam "employees" hai, good

export default db;
