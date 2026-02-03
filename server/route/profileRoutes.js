const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/multer");

const {
  updateProfile,
  getProfile
} = require("../controller/profileController");

router.put("/", protect, upload.single("profile"), updateProfile);
router.get("/", protect, getProfile);

module.exports = router;
