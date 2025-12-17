import { Router } from "express";
import { getDb } from "../db.js";
import { ObjectId } from "mongodb";

const TOOLS_COLLECTION = "tools";
const router = Router();
const db = await getDb();
const tools = db.collection(TOOLS_COLLECTION);


router.post("/tool", async (req, res) => {
  try {
    const { user_id,tools_id } = req.body;

    if (!user_id) {
      return res.status(200).json({ message: "No user id" });
    }

    const toolsList = await tools
      .find({ user_id: user_id,tool_id:tool_id })
      .sort({ createdAt: -1 })
      .toArray();

    if (!tools)
      return res.status(200).json({ message: "No such user id" });

    return res.status(200).json(toolsList);


  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: err });
  }
});


router.post("/tools", async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(200).json({ message: "No user id" });
    }

    const toolsList = await tools
      .find({ user_id: user_id })
      .sort({ createdAt: -1 })
      .toArray();

    if (!toolsList)
      return res.status(200).json({ message: "No such user id" });

    return res.status(200).json(toolsList);


  } catch (err) {
    console.error(err);
    return res.status(200).json({ message: err });
  }
});

router.post("/addtool", async (req, res) => {
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

  await tools.insertOne({ ...newItem });

  res.status(200).json({ message: "Success" });

});




router.post("/deletetool/", async (req, res) => {
  try {
    const { id } = req.body;

    const result = await tools.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "tools not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid id" });
  }
});


router.post("/updatetool", async (req, res) => {
  try {
    const { id, field, value } = req.body;

    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    if (!field) {
      return res.status(400).json({ error: "field is required" });
    }

    const update = { [field]: value };

    const result = await tools.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "tools not found" });
    }

    return res.status(200).json(result.value);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid id" });
  }
});


export default router;
