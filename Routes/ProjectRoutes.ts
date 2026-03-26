import Project from "../Model/Project"
import { Request, Response, Router } from "express";
import upload from "../middleware/upload";

const router: Router = Router();

// @route GET /api/projects
router.get("/", async (req: Request, res: Response): Promise<void> => {
    try{
        const projects = await Project.find({});
        res.json(projects);
    } catch(error){
        res.status(500).json({ error: "Server error" });
        return;
    }
});

// @route POST /api/projects
router.post("/", async (req: Request, res: Response): Promise<void> => {
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
            // imageUrl : imageUrl || "cloudinary://<335812944121835>:<pFsiY9QovHTW1xilSK8Mau0dwLA>@dod3xppgl",
            imageUrl: imageUrl || "",
            subImageUrls: Array.isArray(subImageUrls) ? subImageUrls : [],
            // subImageUrls: subImageUrls || "cloudinary://<335812944121835>:<pFsiY9QovHTW1xilSK8Mau0dwLA>@dod3xppgl",
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
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
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
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
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
});

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

