import { Router } from "express";
import { saveUser, getAllUser, updateUser, deleteUser } from "../Controller/UserController";


const router: Router = Router()

router.get("/", getAllUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/", saveUser);

export default router;
