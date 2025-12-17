import { Router } from "express";
import { getDb } from "../db.js";
import { ObjectId } from "mongodb";


const CHECKLIST_COLLECTION = "checklist";
const router = Router();
const db = await getDb();
const feelings = db.collection(CHECKLIST_COLLECTION);


router.get("/getLastChecklist/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const lastChecklist = await checklists.findOne(
      { userId: new ObjectId(userId) },
      { sort: { createdAt: -1 } }
    );

    if (!lastChecklist) {
      return res.status(404).json({ error: "Checklist not found" });
    }

    return res.status(200).json(lastChecklist);

  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid userId" });
  }
});

export default router;


