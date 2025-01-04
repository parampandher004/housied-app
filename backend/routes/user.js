import express from "express";
const router = express.Router();
import { getUserInfo, updateUserInfo } from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";

router.get("/info", authenticate, getUserInfo);
router.put("/info", authenticate, updateUserInfo);

export default router;
