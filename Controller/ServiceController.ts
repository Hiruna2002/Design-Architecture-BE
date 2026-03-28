import { Request, Response } from "express"
import Service from "../Model/Service";

export const getAllService = async(req: Request, res: Response) => {
    try{
        const services = await Service.find({});
        res.json(services);
    } catch (error) {
        res.status(500).json({error: "Server Error"});
        return;
    }
}

export const SaveService = async(req: Request, res: Response) => {
    try{
        const { 
           name, 
           desc,  
           exp,
           benifits
        } = req.body;

        const service = new Service({
            name, 
            desc, 
            exp,
            benifits
        });
        console.log("Incoming:", req.body);
        const addService = await service.save();
        res.json(addService);
    } catch(error){
        res.status(500).json({ error: "Server error" });
        return;
    }
}

export const updateService = async(req: Request, res: Response) => {
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
}

export const deleteService = async(req: Request, res: Response) => {
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
}

export const findById = async(req: Request, res: Response) => {
    try {
    console.log("request params id is: ", req.params.id);
    const service = await Service.findById(req.params.id);
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}