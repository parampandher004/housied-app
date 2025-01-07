import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getAllPayments,
  getPaymentsByHouseOwner,
  getPaymentsByTenant,
  getPendingPaymentsByTenant,
  payPendingPaymentByTenant,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/owner/:house_owner_userID", authenticate, getPaymentsByHouseOwner);
router.get("/tenant/:tenant_userID", authenticate, getPaymentsByTenant);
router.get(
  "/tenant/:tenant_userID/pending",
  authenticate,
  getPendingPaymentsByTenant
);
router.put(
  "/tenant/:tenant_userID/pay",
  authenticate,
  payPendingPaymentByTenant
);
router.get("/", authenticate, getAllPayments);

export default router;
