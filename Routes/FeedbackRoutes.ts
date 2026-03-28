import { Router } from "express";
import {saveFeedback, getAllFeedback, deleteFeedback} from "../Controller/FeedbackController"

const router:Router = Router()

router.post("/", saveFeedback);
router.get("/", getAllFeedback);
router.delete("/:id", deleteFeedback);

export default router;