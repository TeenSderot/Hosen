import { Router } from "express";
import { getDb } from "../db.js";
import { ObjectId } from "mongodb";

const CONSTRAINTS_COLLECTION = "constraints";
const router = Router();
const db = await getDb();
const constraints = db.collection(CONSTRAINTS_COLLECTION);


router.post("/constraints", async (req, res) => {
  try {
    const { user_id,constraints_id } = req.body;

    if (!user_id) {
      return res.status(200).json({ message: "No user id" });
    }

    const constraintsList = await constraints
      .find({ user_id: user_id,constraints_id:constraints_id })
      .sort({ createdAt: -1 })
      .toArray();

    if (!constraints)
      return res.status(200).json({ message: "No such user id" });

    return res.status(200).json(constraintsList);


  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: err });
  }
});


router.post("/constraintss", async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(200).json({ message: "No user id" });
    }

    const constraintsList = await constraints
      .find({ user_id: user_id })
      .sort({ createdAt: -1 })
      .toArray();

    if (!constraintsList)
      return res.status(200).json({ message: "No such user id" });

    return res.status(200).json(constraintsList);


  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: err });
  }
});

router.post("/addconstraints", async (req, res) => {
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

  await constraints.insertOne({ ...newItem });

  res.status(200).json({ message: "Success" });

});



router.post("/deleteconstraints/", async (req, res) => {
  try {
    const { id } = req.body;

    const result = await constraints.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "constraints not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid id" });
  }
});


router.post("/updateconstraints", async (req, res) => {
  try {
    const { id, field, value } = req.body;

    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    if (!field) {
      return res.status(400).json({ error: "field is required" });
    }

    const update = { [field]: value };

    const result = await constraintss.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "constraints not found" });
    }

    return res.status(200).json(result.value);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid id" });
  }
});


export default router;
