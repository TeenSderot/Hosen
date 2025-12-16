import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.use("/users", userRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Listening on http://localhost:${port}`));
