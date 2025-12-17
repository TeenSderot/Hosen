import { Router } from "express";
import { getDb } from "../db.js";
import { ObjectId } from "mongodb";

const CONVERSATION_COLLECTION = "conversation";
const router = Router();
const db = await getDb();
const conversation = db.collection(CONVERSATION_COLLECTION);


router.post("/conversation", async (req, res) => {
  try {
    const { user_id,conversation_id } = req.body;

    if (!user_id) {
      return res.status(200).json({ message: "No user id" });
    }

    const conversationList = await conversation
      .find({ user_id: user_id,conversation_id:conversation_id })
      .sort({ createdAt: -1 })
      .toArray();

    if (!conversation)
      return res.status(200).json({ message: "No such user id" });

    return res.status(200).json(conversationList);


  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: err });
  }
});


router.post("/conversations", async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(200).json({ message: "No user id" });
    }

    const conversationList = await conversation
      .find({ user_id: user_id })
      .sort({ createdAt: -1 })
      .toArray();

    if (!conversationList)
      return res.status(200).json({ message: "No such user id" });

    return res.status(200).json(conversationList);


  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: err });
  }
});

router.post("/addconversation", async (req, res) => {
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

  await conversation.insertOne({ ...newItem });

  res.status(200).json({ message: "Success" });

});




router.post("/deleteconversation/", async (req, res) => {
  try {
    const { id } = req.body;

    const result = await conversation.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "conversation not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid id" });
  }
});


router.post("/updateconversation", async (req, res) => {
  try {
    const { id, field, value } = req.body;

    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    if (!field) {
      return res.status(400).json({ error: "field is required" });
    }

    const update = { [field]: value };

    const result = await conversations.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "conversation not found" });
    }

    return res.status(200).json(result.value);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid id" });
  }
});


export default router;
