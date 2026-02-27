const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const {
  addShow,
  getShowsByMovie,
  getShowSeats
} = require("../controller/showController");

router.post("/", protect, isAdmin, addShow);
router.get("/movie/:movieId", getShowsByMovie);
router.get("/:id/seats", getShowSeats);

module.exports = router;