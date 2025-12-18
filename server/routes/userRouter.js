import express from "express";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { getDb } from "../db.js";
import "dotenv/config"; // ✔ מספיק
import e from "express";
const router = express.Router();

const USERS_COLLECTION = "users";
const SALT_ROUNDS = 12;
// מומלץ לשים את זה בקובץ .env, אבל כרגע זה יעבוד
const JWT_SECRET = process.env.JWT_SECRET; 

// =====================
// =====================
// 1. REGISTER (תוקן: שומר הצפנה)
// ==========================================
router.post("/register", async (req, res) => {
  try {
    const { email, password ,name} = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "email and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const db = await getDb();
    const users = db.collection(USERS_COLLECTION);

    // בדיקה אם קיים
    const existing = await users.findOne({ email: normalizedEmail });
    if (existing) {
      if(name&&name.length>0){
        await users.updateOne(
          { _id: existing._id },
          { $set: { name: name } }
        );
      }
      return res.status(200).json({ message: "Success", id: existing._id });
    }

    // יצירת הצפנה
    const passwordHash = await bcrypt.hash(String(password), SALT_ROUNDS);

    const doc = {
      email: normalizedEmail,
      password: passwordHash, // שומרים את ההצפנה!
      name: name || "",
      createdAt: new Date(),
    };

    
    const result = await users.insertOne(doc);
    
    return res.status(200).json({ message: "Success", id: result.insertedId });
  } catch (err) {
    console.error("Create user error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// ==========================================
// 2. LOGIN (חדש: נכתב עבורך)
// ==========================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Email and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const db = await getDb();
    const users = db.collection(USERS_COLLECTION);

    // חיפוש המשתמש
    const user = await users.findOne({ email: normalizedEmail });
    
    // אם המשתמש לא קיים
    if (!user) {
      return res.status(401).json({ ok: false, error: "Invalid email or password" });
    }

    // השוואת סיסמה מול ההצפנה ב-DB
    const isMatch = await bcrypt.compare(String(password), user.password);
    
    if (!isMatch) {
      return res.status(401).json({ ok: false, error: "Invalid email or password" });
    }

    // יצירת טוקן
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      // { expiresIn: "12h" } // תוקף הטוקן
    );

    // החזרת תשובה מוצלחת עם הטוקן
    return res.json({ ok: true, token, userId: user._id,name: user.name });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});
router.post("/resetpassword", async (req, res) => {
  try {
    const { _id, password } = req.body;

    if ( !password) {
      return res.status(400).json({ ok: false, error: "Email and password are required" });
    }

    const db = await getDb();
    const users = db.collection(USERS_COLLECTION);

    // חיפוש המשתמש
    const user = await users.findOne({ email: normalizedEmail });
    
    // אם המשתמש לא קיים
    if (!user) {
      return res.status(401).json({ ok: false, error: "Invalid email or password" });
    }

    const passwordHash = await bcrypt.hash(String(password), SALT_ROUNDS);
    const result = await users.updateOne({_id:_id},{$set:{password:passwordHash}});
     if (result.matchedCount === 0) {
      return res.status(404).json({ ok: false, error: "Password not changed" });
    }
    // החזרת תשובה מוצלחת עם הטוקן
    return res.json({ ok: true});

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});
// ==========================================
// 3. UPDATE USER (תוקן: שמות שדות)
// ==========================================
router.post("/updateuser", async (req, res) => {
  try {
    const { id } = req.body; // עדיף לקבל ID מה-Token אבל נשאיר כרגע כמו שכתבת

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ ok: false, error: "Invalid id" });
    }

    const { email, password } = req.body;

    const updates = {};
    if (email) updates.email = String(email).trim().toLowerCase();

    if (password) {
      // כאן תיקנתי שזה ישמור לשדה 'password' ולא 'passwordHash' כדי שיהיה תואם ל-Register
      updates.password = await bcrypt.hash(String(password), SALT_ROUNDS);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ ok: false, error: "No fields to update" });
    }

    updates.updatedAt = new Date();

    const db = await getDb();
    const users = db.collection(USERS_COLLECTION);

    // בדיקת ייחודיות אימייל בעדכון
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

// ==========================================
// 4. DELETE USER
// ==========================================
router.post("/deleteuser", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ ok: false, error: "Invalid id" });
    }

    const db = await getDb();
    const users = db.collection(USERS_COLLECTION);

    const result = await users.deleteOne(
      { _id: new ObjectId(id) },
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

export default router;