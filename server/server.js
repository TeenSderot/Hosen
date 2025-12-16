import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import dotenv from "dotenv";
import checklistsRouter from "./routes/checklistsRouter.js";
import feelingsRouter from "./routes/feelingsRouter.js";
import pressuresRouter from "./routes/pressuresRouter.js";

dotenv.config();

const app = express();
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


app.use("/users", userRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Listening on http://localhost:${port}`));
