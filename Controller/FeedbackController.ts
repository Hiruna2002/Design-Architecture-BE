import Feedback from "../Model/Feedback";
import { Request, Response } from "express";

export const saveFeedback = async (req: Request, res: Response) => {
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
}

export const getAllFeedback = async (req: Request, res: Response) => {
    try{
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch(error){
        res.status(500).json({ error: "Server error" });
    }
}

export const deleteFeedback = async (req: Request, res: Response) => {
    try{
        const project = await Feedback.findById(req.params.id);
        if(project){
            await project.deleteOne();
            res.json({ message: "Feedback deleted successfully" });
        } else {
            res.status(404).json({ error: "Feedback not found" });
        }
    } catch(error){
        res.status(500).json({ error: "Server error" });
        return;
    }
}