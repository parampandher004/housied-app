import express from "express";
const router = express.Router();
import {
  getUserInfo,
  updateUserInfo,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";

router.get("/info", authenticate, getUserInfo);
router.put("/info", authenticate, updateUserInfo);
router.get("/all", authenticate, getAllUsers);
router.delete("/:userId", authenticate, deleteUser);

export default router;
