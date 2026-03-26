import Feedback from "../Model/Feedback";
import { Request, Response, Router } from "express";

const router:Router = Router()

router.post("/", async (req: Request, res: Response): Promise<void> => {
    try{
        const {
            name,
            message,
            rating
        } = req.body;

        const feedback = new Feedback({
            name,
            message,
            rating
        });

        const addFeedback = await feedback.save();
        res.json(addFeedback)
    } catch(error){
        res.status(500).json({ error: "Server error" });
        return;
    }
});

router.get("/", async (req, res) => {
    try{
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch(error){
        res.status(500).json({ error: "Server error" });
    }
});

export default router;