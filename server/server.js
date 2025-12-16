import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import checklistsRouter from "./routes/checklistsRouter.js";
import feelingsRouter from "./routes/feelingsRouter.js";
import pressuresRouter from "./routes/pressuresRouter.js";
import http from 'http';

dotenv.config();
let mongoClient, database, feelings_collection;
const app = express();
const server = http.createserver(app);
app.use(cors(
  {
    oprigin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content_type", "Authorization"],
  }));
  
app.use(express.json({ limit: "50mb" }))
app.use((express.urlencoded({ limit: "50mb" })))
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.use("/feelings", feelingsRouter);
app.use("/pressures", pressuresRouter);
app.use("/checklists", checklistsRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    mongoClient = await connectToDatabase()
    database = mongoClient.db("hosen")

    feelings_collection = database.collection("feelings")

    // אירועי חיבור DB
    mongoClient.on("close", () => {
      console.error("MongoDB connection closed")
    })

    mongoClient.on("reconnect", () => {
      console.log("MongoDB reconnected")
    })

    mongoClient.on("error", (err) => {
      console.error("MongoDB connection error:", err)
    })

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  } catch (err) {
    console.error("Failed to start server:", err)
    process.exit(1)
  }
}

startServer()