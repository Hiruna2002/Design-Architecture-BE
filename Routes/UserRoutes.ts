import { Router, Request, Response } from "express";
import User from "../Model/User";

const router: Router = Router()

// @route Post /api/users
router.post("/", async (req: Request, res: Response):Promise <void> => {
    try{
        const {
            name,
            email,
            phone,
            password,
            role
        } = req.body
        const user = new User({
            name,
            email,
            phone,
            password,
            role
        })
        const addUser = await user.save()
        res.status(201).json(addUser);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error creating user" });
        return;
    }
});

// @route Get /api/users
router.get("/", async (req: Request, res: Response): Promise<void> => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
        return;
    }
});

// @route Put /api/users/:id
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
    try{
        const {
            name,
            email,
            phone,
            password,
            role
        } = req.body
        const user = await User.findByIdAndUpdate(req.params.id)
        if(user){
            user.name = name || user.name;
            user.email = email || user.email;
            user.phone = phone || user.phone;
            user.password = password || user.password;
            user.role = role || user.role;

            const updateUser = await user.save();
            res.status(200).json(updateUser);
        } else {
            res.status(404).json({ error: "User not found" });
            return;
        }
        
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
        return;
    }
});

// @route Delete /api/users/:id
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
    try{
        const user = await User.findById(req.params.id)
        if(user){
            await user.deleteOne();
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
            return;
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
        return;
    }
});

export default router;
