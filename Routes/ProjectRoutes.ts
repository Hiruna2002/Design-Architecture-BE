import Project from "../Model/Project"
import { Request, Response, Router } from "express";

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
            imageUrl, 
            category, 
            cost,
            area
        } = req.body;

        const project = new Project({
            name, 
            description, 
            imageUrl, 
            category, 
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
            category, 
            cost,
            area
        } = req.body;

        const product = await Project.findById(req.params.id);

        if(product){
            // Update the product fields
            product.name = name;
            product.description = description;
            product.imageUrl = imageUrl;
            product.category = category;
            product.cost = cost;
            product.area = area;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
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
        const product = await Project.findById(req.params.id);
        if(product){
            await product.deleteOne();
            res.json({ message: "Project deleted successfully" });
        } else {
            res.status(404).json({ error: "Project not found" });
        }
    } catch(error){
        res.status(500).json({ error: "Server error" });
        return;
    }
});

export default router;

