import { Router } from "express";
import { saveProject, getAllProject, updateProject, deleteProject, findById } from "../Controller/ProjectController";

const router: Router = Router();

router.get("/", getAllProject);
router.post("/", saveProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.get("/:id", findById);

export default router;

