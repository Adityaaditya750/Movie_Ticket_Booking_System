const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const {
  addShow,
  getShowsByMovie,
  getAllShows,
  deleteShow,
  getShowSeats
} = require("../controller/showController");

// admin add show
router.post("/", protect, isAdmin, addShow);

// admin get all shows
router.get("/", protect, isAdmin, getAllShows);

// public get shows by movie
router.get("/movie/:movieId", getShowsByMovie);

router.get("/:id/seats", getShowSeats);


// admin delete show
router.delete("/:id", protect, isAdmin, deleteShow);

module.exports = router;
