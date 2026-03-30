import { Router } from "express";
import { registerUser, loginUser, getAllUser, updateUser, deleteUser } from "../Controller/UserController";
import { protect, AuthRequest } from "../middleware/authMiddleware";

const router: Router = Router()

router.post("/", registerUser);
router.get("/", getAllUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);

router.get("/profile", protect, (req: AuthRequest, res) => {
  console.log("request user is: ", req.user);
  res.json(req.user);
});

export default router;
