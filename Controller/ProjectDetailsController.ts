import Project from "../Model/Project";
import { Request, Response } from "express";

export const getAllProductDetail = async(req: Request, res: Response) => {
    try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}