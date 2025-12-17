import { Router} from "express";
import { getDb } from "../db.js";
import { ObjectId } from "mongodb";

const FAVORITES_COLLECTION = "favorites";
const router = Router();
const db = await getDb()
const favorites = db.collection(FAVORITES_COLLECTION);

router.post("/getfavorites", async(req, res) => {
    const {user_id} = req.body;
    const resourcesList = await favorites
      .find({ user_id: user_id })
      .sort({ createdAt: -1 })
      .toArray();
    if (!resourcesList) {
      return res.status(404).json({"no user found":user_id});
    }
    res.status(200).json(resourcesList);
});

router.post("/addfavorite", async (req, res) => {
    const { title, description, user_id } = req.body;
    if (!title) {
        return res.status(400).json({ error: "title is required" });
    }
    const newItem = {
        title,
        description: description ?? "",
        user_id,
        createdAt: new Date().toISOString()
    };
    await favorites.insertOne({...newItem});
    res.status(200).json({ message: "Success" });
});

router.post("/deletefavorite/", async (req, res) => {
  try {
    const { user_id, resources_id } = req.body;
    const result = await favorites.deleteOne({
        _id: new ObjectId(resources_id)
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
router.post("/updatefavorite", async (req, res) => {
 try {
     const { id, field, value } = req.body;
 
     if (!id) {
       return res.status(400).json({ error: "id is required" });
     }
 
     if (!field) {
       return res.status(400).json({ error: "field is required" });
     }
 
     const update = { [field]: value };
 
     const result = await favorites.findOneAndUpdate(
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