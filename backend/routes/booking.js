import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getAllBookings,
  getBookingsByHouseOwner,
  getBookingsByTenant, addBooking
} from "../controllers/bookingController.js";

const router = express.Router();

router.get("/owner/:house_owner_userID", authenticate, getBookingsByHouseOwner);
router.get("/tenant/:tenant_userID", authenticate, getBookingsByTenant);
router.get("/", authenticate, getAllBookings);
router.post("/:tenant_userId/:property_id", authenticate, addBooking);

export default router;
