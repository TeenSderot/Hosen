import { Router } from "express";
import { getDb } from "../db.js";
import { ObjectId } from "mongodb";

const CHECKLIST_COLLECTION = "feelings";
const router = Router();
const db = await getDb();
const checklist = db.collection(CHECKLIST_COLLECTION);


router.post("/checklist", async (req, res) => {
  try {
    const { user_id,checklist_id } = req.body;

    if (!user_id) {
      return res.status(200).json({ message: "No user id" });
    }

    const checklistList = await checklist
      .find({ user_id: user_id,checklist_id:checklist_id })
      .sort({ createdAt: -1 })
      .toArray();

    if (!checklist)
      return res.status(200).json({ message: "No such user id" });

    return res.status(200).json(checklistList);


  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: err });
  }
});


router.post("/checklists", async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(200).json({ message: "No user id" });
    }

    const checklistList = await checklist
      .find({ user_id: user_id })
      .sort({ createdAt: -1 })
      .toArray();

    if (!checklist)
      return res.status(200).json({ message: "No such user id" });

    return res.status(200).json(checklistList);


  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: err });
  }
});

router.post("/addchecklist", async (req, res) => {
  const { title, text, user_id } = req.body;

  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }

  const newItem = {
    user_id,
    title,
    text: text ?? "",
    createdAt: new Date().toISOString()
  };

  await checklist.insertOne({ ...newItem });

  res.status(200).json({ message: "Success" });

});




router.post("/deletechecklist/", async (req, res) => {
  try {
    const { id } = req.body;

    const result = await checklist.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Checklist not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid id" });
  }
});


router.post("/updatechecklist", async (req, res) => {
  try {
    const { id, field, value } = req.body;

    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    if (!field) {
      return res.status(400).json({ error: "field is required" });
    }

    const update = { [field]: value };

    const result = await checklists.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "Checklist not found" });
    }

    return res.status(200).json(result.value);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid id" });
  }
});


export default router;
