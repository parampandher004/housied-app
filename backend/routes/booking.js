import express from "express";
import { authenticate } from "../middleware/auth.js";
import { getAllBookings } from "../controllers/bookingController.js";
// getBooksByHouseOwner,
// getBookingByTenant,
// addBooking,
// updateBooking,
// deleteBooking,
const router = express.Router();

// router.get(
//   "/houseOwner/:house_owner_userID",
//   authenticate,
//   getBooksByHouseOwner
// );
// router.get("/tenant/:tenant_userID", authenticate, getBookingByTenant);
router.get("/", authenticate, getAllBookings);

export default router;
