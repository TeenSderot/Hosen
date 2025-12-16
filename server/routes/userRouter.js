import express from "express";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { getDb } from "../db.js";

const router = express.Router();

const USERS_COLLECTION = "users";
const SALT_ROUNDS = 12;

// POST /users  -> Create user
router.post("/", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "email and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const db = await getDb();
    const users = db.collection(USERS_COLLECTION);

    // unique email check
    const existing = await users.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ ok: false, error: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(String(password), SALT_ROUNDS);

    const now = new Date();
    const doc = {
      email: normalizedEmail,
      passwordHash,
      role: role || "user",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    const result = await users.insertOne(doc);
    return res.status(201).json({ ok: true, id: result.insertedId });
  } catch (err) {
    console.error("Create user error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// PUT /users/:id -> Update user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ ok: false, error: "Invalid id" });
    }

    const { email, password, role, isActive } = req.body;

    const updates = {};
    if (email) updates.email = String(email).trim().toLowerCase();
    if (role) updates.role = role;
    if (typeof isActive === "boolean") updates.isActive = isActive;

    if (password) {
      updates.passwordHash = await bcrypt.hash(String(password), SALT_ROUNDS);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ ok: false, error: "No fields to update" });
    }

    updates.updatedAt = new Date();

    const db = await getDb();
    const users = db.collection(USERS_COLLECTION);

    // If updating email, keep it unique
    if (updates.email) {
      const existing = await users.findOne({
        email: updates.email,
        _id: { $ne: new ObjectId(id) },
      });
      if (existing) {
        return res.status(409).json({ ok: false, error: "Email already exists" });
      }
    }

    const result = await users.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("Update user error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// DELETE /users/:id -> Soft delete user (isActive=false)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ ok: false, error: "Invalid id" });
    }

    const db = await getDb();
    const users = db.collection(USERS_COLLECTION);

    const result = await users.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isActive: false, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("Delete user error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// POST /users/login -> Login (NO JWT YET)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "email and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const db = await getDb();
    const users = db.collection(USERS_COLLECTION);

    const user = await users.findOne({ email: normalizedEmail });

    // Don't leak which field is wrong
    if (!user || user.isActive === false) {
      return res.status(401).json({ ok: false, error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(String(password), user.passwordHash);
    if (!match) {
      return res.status(401).json({ ok: false, error: "Invalid credentials" });
    }

    // return minimal user info
    return res.json({
      ok: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

export default router;
