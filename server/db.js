import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI in .env");

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

let cachedDb = null;

export async function getDb() {
  if (cachedDb) return cachedDb;

  await client.connect();
  const dbName = process.env.DB_NAME || "hosen"; // אפשר לשנות לפי החבר
  cachedDb = client.db(dbName);
  console.log("✅ Connected to MongoDB, db:", dbName);

  return cachedDb;
}
