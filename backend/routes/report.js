import express from "express";
import { addReport, getReports, getMonthlyRevenue, getFundsByPropertyType, getWeeklyRevenue, getTopRatedProperties, getRatedPropertiesByType } from "../controllers/reportController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Add report
router.post("/add", authenticate, addReport);

// Get reports
router.get("/:property_id", authenticate, getReports);

// Get monthly revenue
router.get("/revenue/:month/:year", authenticate, getMonthlyRevenue);

// Get funds by property type
router.get("/funds-by-property-type", authenticate, getFundsByPropertyType);

// Get weekly revenue
router.get("/revenue/weekly/:startDate/:endDate", authenticate, getWeeklyRevenue);

// Get top-rated properties
router.get("/top-rated-properties", authenticate, getTopRatedProperties);

// Get rated properties by type
router.get("/rated-properties-by-type", authenticate, getRatedPropertiesByType);

export default router;
