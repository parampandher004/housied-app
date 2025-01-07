import express from "express";
import {
  addProperty,
  removeProperty,
  updateProperty,
  getProperties,
  getPropertiesByHouseOwner,
} from "../controllers/propertyController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Add property
router.post("/add", authenticate, addProperty);

// Remove property
router.delete("/remove/:id", authenticate, removeProperty);

// Update property
router.put("/update/:id", authenticate, updateProperty);

// Get properties
router.get("/", authenticate, getProperties);

// Get properties by house owner
router.get(
  "/owner/:house_owner_userID",
  authenticate,
  getPropertiesByHouseOwner
);

export default router;
