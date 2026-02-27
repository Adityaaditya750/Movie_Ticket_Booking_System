const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const {
  bookSeats,
  myBookings,
  cancelBooking,
  scanTicket
} = require("../controller/bookingController");

router.post("/", protect, bookSeats);
router.get("/my", protect, myBookings);
router.put("/cancel/:id", protect, cancelBooking);

// scanner route (admin)
router.post("/scan", protect, isAdmin, scanTicket);

module.exports = router;