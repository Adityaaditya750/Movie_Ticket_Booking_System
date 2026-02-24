const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  bookSeats,
  myBookings,
  cancelBooking
} = require("../controller/bookingController");

// book seats
router.post("/", protect, bookSeats);

// my bookings
router.get("/my", protect, myBookings);

// cancel booking
router.put("/cancel/:id", protect, cancelBooking);

module.exports = router;
