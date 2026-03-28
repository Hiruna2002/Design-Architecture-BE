import { Router } from "express";
import { SaveService, getAllService, updateService, deleteService, findById } from "../Controller/ServiceController";

const router: Router = Router();

router.get("/" , getAllService);
router.post("/", SaveService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);
router.get("/:id", findById);

export default router;