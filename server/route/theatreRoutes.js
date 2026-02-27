const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const { addTheatre, getTheatres } = require("../controller/theatreController");

router.post("/", protect, isAdmin, addTheatre);
router.get("/", getTheatres);

module.exports = router;