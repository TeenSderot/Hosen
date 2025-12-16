import express from "express";
import { createUser, updateUser, deleteUser, login } from "../controllers/userController.js";

const router = express.Router();

// Users CRUD
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Login (כרגע בלי JWT)
router.post("/login", login);

export default router;
