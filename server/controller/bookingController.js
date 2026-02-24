const Booking = require("../model/Booking");
const Show = require("../model/Show");

/* =========================
   BOOK TICKETS (USER)
========================= */
exports.bookSeats = async (req, res) => {
  try {
    const { showId, seats } = req.body;

    if (!showId || !seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: "showId and seats array required" });
    }

    const show = await Show.findById(showId);

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    // check show time is not passed
    if (new Date(show.showTime) <= new Date()) {
      return res.status(400).json({ message: "Show time already passed" });
    }

    // validate seat exists in layout
    const invalidSeats = seats.filter((s) => !show.seatLayout.includes(s));
    if (invalidSeats.length > 0) {
      return res.status(400).json({
        message: "Invalid seat(s)",
        invalidSeats
      });
    }

    // prevent double booking
    const alreadyBooked = seats.filter((s) => show.bookedSeats.includes(s));

    if (alreadyBooked.length > 0) {
      return res.status(400).json({
        message: "Some seats already booked",
        alreadyBooked
      });
    }

    // total price
    const totalPrice = seats.length * show.price;

    // 1) create booking
    const booking = await Booking.create({
      user: req.user._id,
      show: showId,
      seats,
      totalPrice
    });

    // 2) update show booked seats
    show.bookedSeats.push(...seats);
    await show.save();

    res.status(201).json({
      message: "Booking successful",
      booking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================
   MY BOOKINGS (USER)
========================= */
exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: "show",
      populate: [
        { path: "movie", select: "title poster.url" },
        { path: "theatre", select: "name location" }
      ]
    })
    .sort({ createdAt: -1 });

  res.json(bookings);
};

/* =========================
   CANCEL BOOKING (USER)
   Only before show time
========================= */
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("show");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // booking belongs to user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // already cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    // cancel only before show time
    if (new Date(booking.show.showTime) <= new Date()) {
      return res.status(400).json({ message: "Cannot cancel after show time" });
    }

    // remove booked seats from show
    const show = await Show.findById(booking.show._id);

    show.bookedSeats = show.bookedSeats.filter(
      (seat) => !booking.seats.includes(seat)
    );

    await show.save();

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
