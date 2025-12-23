import "dotenv/config";
import express from "express";
import dotenv from "dotenv";

import userRouter from "./routes/userRouter.js";
import checklistsRouter from "./routes/checklistsRouter.js";
import feelingsRouter from "./routes/feelingsRouter.js";
import pressuresRouter from "./routes/pressuresRouter.js";
import constraintsRouter from "./routes/constraintsRouter.js";
import resourcesRouter from "./routes/resourcesRouter.js";
import conversationRouter from "./routes/conversationRouter.js";
import toolsRouter from "./routes/toolsRouter.js";
import favoritesRouter from "./routes/favoritesRouter.js";
import q_aRouter from "./routes/q_aRouter.js";


dotenv.config();

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});
app.use(express.json({ limit: "50mb" }))
app.use((express.urlencoded({ limit: "50mb" })))
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.use((req, _res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});
app.use("/feelings", feelingsRouter);
app.use("/pressures", pressuresRouter);
app.use("/checklists", checklistsRouter);
app.use("/users", userRouter);
app.use("/constraints", constraintsRouter);
app.use("/resources", resourcesRouter);
app.use("/conversation",conversationRouter);
app.use("/tools",toolsRouter);
app.use("/q_a",q_aRouter);
app.use("/favorites",favoritesRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Listening on http://localhost:${port}`));
