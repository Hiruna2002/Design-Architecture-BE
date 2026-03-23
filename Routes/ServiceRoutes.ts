import Service from "../Model/Service";
import { Request, Response, Router } from "express";

const router: Router = Router();

// @router GET /api/services
router.get("/" , async (req: Request, res: Response): Promise<void> => {
    try{
        const services = await Service.find({});
        res.json(services);
    } catch (error) {
        res.status(500).json({error: "Server Error"});
        return;
    }
});

// @route POST /api/services
router.post("/", async (req: Request, res: Response): Promise<void> => {
    try{
        const { 
           name, 
           description,  
           exp,
           benifits
        } = req.body;

        const service = new Service({
            name, 
            description, 
            exp,
            benifits
        });
        const addService = await service.save();
        res.json(addService);
    } catch(error){
        res.status(500).json({ error: "Server error" });
        return;
    }
});


// @route PUT /api/services
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
    try{
        const { 
            name, 
            desc, 
            exp, 
            benifits,
        } = req.body;

        const service = await Service.findById(req.params.id);

        if(service){
            service.name = name;
            service.desc = desc;
            service.exp = exp;
            service.benifits = benifits;

            const updatedService = await service.save();
            res.json(updatedService);
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
        const service = await Service.findById(req.params.id);
        if(service){
            await service.deleteOne();
            res.json({ message: "Service deleted successfully" });
        } else {
            res.status(404).json({ error: "Service not found" });
        }
    } catch(error){
        res.status(500).json({ error: "Server error" });
        return;
    }
});

export default router;