import Project from "../Model/Project"
import { Request, Response } from "express";

export const saveProject = async(req: Request, res: Response) => {
    try{
            const { 
               name, 
                description,  
                // category, 
                cost,
                area,
                imageUrl,
                subImageUrls
            } = req.body;
    
            const project = new Project({
                name, 
                description, 
                imageUrl: imageUrl || "",
                subImageUrls: Array.isArray(subImageUrls) ? subImageUrls : [],
                // category, 
                cost,
                area
            });
            const addProject = await project.save();
            res.json(addProject);
        } catch(error){
            res.status(500).json({ error: "Server error" });
            return;
        }
}

export const getAllProject = async(req: Request, res: Response) => {
    try{
        const projects = await Project.find({});
        res.json(projects);
    } catch(error){
        res.status(500).json({ error: "Server error" });
        return;
    }
}

export const updateProject = async(req: Request, res: Response) => {
    try{
        const { 
            name, 
            description, 
            imageUrl, 
            subImageUrls,
            // category, 
            cost,
            area
        } = req.body;

        const project = await Project.findById(req.params.id);

        if(project){
            // Update the product fields
            project.name = name;
            project.description = description;
            project.imageUrl = imageUrl;
            project.subImageUrls = Array.isArray(subImageUrls) ? subImageUrls : project.subImageUrls;
            // project.subImageUrls = subImageUrls;
            // project.category = category;
            project.cost = cost;
            project.area = area;

            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ error: "Project not found" });
        }
    } catch(error){
        res.status(500).json({ error: "Server error" });
        return;
    }
}

export const deleteProject = async(req: Request, res: Response) => {
    try{
        const project = await Project.findById(req.params.id);
        if(project){
            await project.deleteOne();
            res.json({ message: "Project deleted successfully" });
        } else {
            res.status(404).json({ error: "Project not found" });
        }
    } catch(error){
        res.status(500).json({ error: "Server error" });
        return;
    }
}

export const findById = async(req: Request, res: Response) => {
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