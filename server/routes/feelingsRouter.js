import { Router } from "express";
import { getDb } from "../db.js";
import { ObjectId } from "mongodb";

const FEELINGS_COLLECTION = "feelings";
const router = Router();
const db = await getDb();
const feelings = db.collection(FEELINGS_COLLECTION);


router.post("/feeling", (req, res) => {
    res.status(200).json(feeling);
});




router.post("/addfeeling", async (req, res) => {
    const { title, text } = req.body;

    if (!title) {
        return res.status(400).json({ error: "title is required" });
    }

    const newItem = {
        title,
        text: text ?? "",
        createdAt: new Date().toISOString()
    };

    await feelings.insertOne({...newItem});

    res.status(200).json({ message: "Success" });

});




router.delete("/deletefeeling/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await feelings.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Feeling not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid id" });
  }
});


router.post("/updateFeeling", async (req, res) => {
  try {
    const { id, title, text } = req.body; 

    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    const update = {};
    if (title !== undefined) update.title = title;
    if (text !== undefined) update.text = text;

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ error: "send title and/or text" });
    }

    const result = await feelings.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );

    
    if (!result.title) {
      return res.status(404).json({ error: "Feeling not found" });
    }

    return res.status(200).json(result.value);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid id" });
  }
});


export default router;
