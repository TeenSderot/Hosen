import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import checklistsRouter from "./routes/checklistsRouter.js";
import feelingsRouter from "./routes/feelingsRouter.js";
import pressuresRouter from "./routes/pressuresRouter.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.use("/feelings", feelingsRouter); 
app.use("/pressures", pressuresRouter);   
app.use("/checklists", checklistsRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});