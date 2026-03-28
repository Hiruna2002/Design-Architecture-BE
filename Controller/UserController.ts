import User from "../Model/User"
import { Request, Response } from "express"

export const getAllUser = async(req: Request, res: Response) => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
        return;
    }
}

export const saveUser = async(req: Request, res: Response) => {
    const {
        email,
        password,
    } = req.body

    try{
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                success: 'false',
                message: 'User not found'
            });
        }

        if(user.password !== password){
            return res.status(400).json({
                success: "false",
                message: "Password mismatch"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: user
        });
    } catch(error){
        console.log(error);
    }    
}

export const updateUser = async(req: Request, res: Response) => {
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
}

export const deleteUser = async(req: Request, res: Response) => {
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
}