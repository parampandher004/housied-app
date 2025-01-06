import express from "express";
import { addProperty, removeProperty, updateProperty, getProperties } from "../controllers/propertyController.js";

const router = express.Router();

// Add property
router.post("/add", addProperty);

// Remove property
router.delete("/remove/:id", removeProperty);

// Update property
router.put("/update/:id", updateProperty);

// Get properties
router.get("/", getProperties);

export default router;
