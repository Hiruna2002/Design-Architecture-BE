import { Router } from "express";
import { getAllProductDetail } from "../Controller/ProjectDetailsController";

const router: Router = Router();

router.get("/:id", getAllProductDetail);

export default router;