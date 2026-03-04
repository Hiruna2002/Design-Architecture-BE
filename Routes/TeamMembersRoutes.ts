import { Router, Request, Response } from "express";
import TeamMembers from "../Model/TeamMembers";

const router: Router = Router()


// @route Post /api/team-members
router.post("/", async (req: Request, res: Response):Promise <void> => {
    try{
        const {
            name,
            role,
            description,
            email
        } = req.body

        const teamMembers = new TeamMembers({
            name,
            role,
            description,
            email
        })

        const addTeamMember = await teamMembers.save();
        res.json(addTeamMember);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        return;
    }
});

// @route Get /api/team-members
router.get("/", async (req: Request, res: Response): Promise<void> => {
    try{
        const teamMembers = await TeamMembers.find({});
        res.json(teamMembers);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        return;
    }
});

// @route Put /api/team-members/:id
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
    try{
        const {
            name,
            role,
            description,
            email
        } = req.body
        const teamMembers = await TeamMembers.findById(req.params.id);

        if(teamMembers){
            teamMembers.name = name;
            teamMembers.role = role;
            teamMembers.description = description;
            teamMembers.email = email;

            const updateTeamMember = await teamMembers.save();
            res.json(updateTeamMember);
        } else {
            res.status(404).json({ error: "Team member not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        return;
    }
});

// @route Delete /api/team-members/:id
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
    try{
        const teamMembers = await TeamMembers.findById(req.params.id);

        if(teamMembers){
            await teamMembers.deleteOne();
            res.json({ message: "Team member deleted" });
        } else {
            res.status(404).json({ error: "Team member not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        return;
    }
});

export default router;