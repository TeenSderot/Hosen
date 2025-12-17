import { Router} from "express";
import { getDb } from "../db.js";
import { ObjectId } from "mongodb";

const RESOURCES_COLLECTION = "resources";
const router = Router();
const db = await getDb()
const resources = db.collection(RESOURCES_COLLECTION);
router.post("/getallresources", async (req, res) => {
    const all = await resources.find({}).toArray();
    res.status(200).json(all);
});
router.post("/getresource", (req, res) => {
    const {id} = req.body;
    const one = resources.findOne({_id: new ObjectId(id)});
    if (!one) {
      return res.status(404).json({err});
    }
    res.status(200).json(one);
});

router.post("/addresource", async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: "title is required" });
    }
    const newItem = {
        title,
        description: description ?? "",
        createdAt: new Date().toISOString()
    };
    await resources.insertOne({...newItem});
    res.status(200).json({ message: "Success" });
});

router.post("/deleteresource/", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await resources.deleteOne({
        _id: new ObjectId(id)
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid id" });
  }
});
router.post("/updateresource", async (req, res) => {
  try {
    const { id } = req.body;
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "title is required" });
    }
    const result = await resources.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, description: description ?? "" } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json({ message: "Updated successfully" });
  }
    catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid id" });
  }
});
export default router;