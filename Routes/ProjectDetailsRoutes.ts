import Project from "../Model/Project"
import { Router } from "express";

const router: Router = Router();

router.get("/:id", async (req, res) => {
  try {
    console.log("backend ok.......")
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;