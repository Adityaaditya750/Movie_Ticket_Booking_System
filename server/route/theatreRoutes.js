const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const {
  addTheatre,
  getTheatres
} = require("../controller/theatreController");

// admin add theatre
router.post("/", protect, isAdmin, addTheatre);

// public get theatres
router.get("/", getTheatres);

module.exports = router;
