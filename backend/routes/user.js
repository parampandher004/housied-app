import express from "express";
const router = express.Router();
const {
  getUserInfo,
  updateUserInfo,
} = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");

router.get("info, authenticate, getUserInfo");
router.put("info, authenticate, updateUserInfo");

module.exports = router;
