import { Router } from "express";
import { getDb } from "../db.js";
import { ObjectId } from "mongodb";

const CONSTRAINTS_COLLECTION = "constraints";
const router = Router();
const db = await getDb()
const constraints = db.collection(CONSTRAINTS_COLLECTION);


router.post("/getconstraints", (req, res) => {
    res.status(200).json(constraints);
});

router.post("/addconstraint", async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: "title is required" });
    }
    const newItem = {
        title,
        description: description ?? "",
        createdAt: new Date().toISOString()
    };
    await constraints.insertOne({...newItem});
    res.status(200).json({ message: "Success" });
});

router.post("/deleteconstraint/", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await constraints.deleteOne({
        _id: new ObjectId(id)
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Constraint not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid id" });
  }
});
router.post("/updateconstraint", async (req, res) => {
  try {
    const { id } = req.body;
    const { title, text } = req.body;
    if (!title) {
      return res.status(400).json({ error: "title is required" });
    }
    const result = await constraints.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, text: text ?? "" } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Constraint not found" });
    }
    res.status(200).json({ message: "Updated successfully" });
  }
    catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid id" });
  }
});
router.get("/ping", (req, res) => res.json({ ok: true }))
export default router;