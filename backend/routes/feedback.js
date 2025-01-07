import express from "express";
import { addFeedback, getFeedback } from "../controllers/feedbackController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Add feedback
router.post("/add", authenticate, addFeedback);

// Get feedback
router.get("/:property_id", authenticate, getFeedback);

export default router;
