import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getAllBookings,
  getBookingsByHouseOwner,
  getBookingsByTenant,
} from "../controllers/bookingController.js";
// ,
// addBooking,
// updateBooking,
// deleteBooking,
const router = express.Router();

router.get("/owner/:house_owner_userID", authenticate, getBookingsByHouseOwner);
router.get("/tenant/:tenant_userID", authenticate, getBookingsByTenant);
router.get("/", authenticate, getAllBookings);

export default router;
