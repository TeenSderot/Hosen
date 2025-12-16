import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json(feelings);
});

router.post("/addfeeling", (req, res) => {
    const { title, text } = req.body;

    if (!title) {
        return res.status(400).json({ error: "title is required" });
    }

    const newItem = {
        title,
        text: text ?? "",
        createdAt: new Date().toISOString()
    };
    
    res.status(200).json({message:"Success"});

});

export default router;
