import { Router } from "express";
import { getDb } from "../db.js";
import { ObjectId } from "mongodb";

const Q_A_COLLECTION = "q_as";
const router = Router();
const db = await getDb();
const q_as = db.collection(Q_A_COLLECTION);


router.post("/q_a", async (req, res) => {
  try {
    const { user_id,q_as_id } = req.body;

    if (!user_id) {
      return res.status(200).json({ message: "No user id" });
    }

    const q_asList = await q_as
      .find({ user_id: user_id,q_a_id:q_a_id })
      .sort({ createdAt: -1 })
      .toArray();

    if (!q_as)
      return res.status(200).json({ message: "No such user id" });

    return res.status(200).json(q_asList);


  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: err });
  }
});


router.post("/q_as", async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(200).json({ message: "No user id" });
    }

    const q_asList = await q_as
      .find({ user_id: user_id })
      .sort({ createdAt: -1 })
      .toArray();

    if (!q_asList)
      return res.status(200).json({ message: "No such user id" });

    return res.status(200).json(q_asList);


  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: err });
  }
});

router.post("/addq_a", async (req, res) => {
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

  await q_as.insertOne({ ...newItem });

  res.status(200).json({ message: "Success" });

});




router.post("/deleteq_a/", async (req, res) => {
  try {
    const { id } = req.body;

    const result = await q_as.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "q_as not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid id" });
  }
});


router.post("/updateq_a", async (req, res) => {
  try {
    const { id, field, value } = req.body;

    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    if (!field) {
      return res.status(400).json({ error: "field is required" });
    }

    const update = { [field]: value };

    const result = await q_as.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "q_as not found" });
    }

    return res.status(200).json(result.value);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid id" });
  }
});


export default router;
