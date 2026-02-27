const Booking = require("../model/Booking");
const Show = require("../model/Show");
const User = require("../model/User");

const QRCode = require("qrcode");
const { sendEmail } = require("../utils/sendEmail");

/* =========================
   BOOK SEATS (USER)
========================= */
exports.bookSeats = async (req, res) => {
  try {
    const { showId, seats } = req.body;

    if (!showId || !seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: "showId and seats array required" });
    }

    const show = await Show.findById(showId)
      .populate("movie", "title")
      .populate("theatre", "name location");

    if (!show) return res.status(404).json({ message: "Show not found" });

    // show time check
    if (new Date(show.showTime) <= new Date()) {
      return res.status(400).json({ message: "Show time already passed" });
    }

    // validate seats exist
    const invalidSeats = seats.filter((s) => !show.seatLayout.includes(s));
    if (invalidSeats.length > 0) {
      return res.status(400).json({ message: "Invalid seats", invalidSeats });
    }

    // prevent double booking
    const alreadyBooked = seats.filter((s) => show.bookedSeats.includes(s));
    if (alreadyBooked.length > 0) {
      return res.status(400).json({
        message: "Some seats already booked",
        alreadyBooked
      });
    }

    // calculate total price row-wise
    let totalPrice = 0;
    for (let seat of seats) {
      const row = seat[0];
      const rowPrice = show.seatPrices[row];

      if (!rowPrice) {
        return res.status(400).json({
          message: `Price not set for row ${row}`
        });
      }
      totalPrice += rowPrice;
    }

    // create booking
    const booking = await Booking.create({
      user: req.user._id,
      show: showId,
      seats,
      totalPrice,
      status: "booked",
      qrExpiresAt: show.showTime
    });

    // update show bookedSeats
    show.bookedSeats.push(...seats);
    await show.save();

    // generate QR
    const qrData = JSON.stringify({
      bookingId: booking._id,
      showId: show._id,
      movie: show.movie.title,
      theatre: show.theatre.name,
      showTime: show.showTime
    });

    const qrCode = await QRCode.toDataURL(qrData);

    booking.qrData = qrData;
    booking.qrCode = qrCode;
    await booking.save();

    // send email
    const user = await User.findById(req.user._id);

    await sendEmail({
      to: user.email,
      subject: "Movie Ticket Booking Confirmed 🎬",
      text: `
Booking Confirmed!

Movie: ${show.movie.title}
Theatre: ${show.theatre.name}
Location: ${show.theatre.location}
Show Time: ${show.showTime}

Seats: ${seats.join(", ")}
Total Price: ₹${totalPrice}

Booking ID: ${booking._id}

Note:
Ticket can be cancelled only before 1 hour of showtime.
`
    });

    res.status(201).json({
      message: "Booking successful",
      booking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================
   MY BOOKINGS
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
   CANCEL BOOKING
   (only before 1 hour)
========================= */
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("show");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    const showTime = new Date(booking.show.showTime);
    const now = new Date();

    const diffMinutes = (showTime - now) / (1000 * 60);

    if (diffMinutes <= 60) {
      return res.status(400).json({
        message: "Cannot cancel ticket before 1 hour of show time"
      });
    }

    // restore seats
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

/* =========================
   SCAN TICKET (ADMIN)
========================= */
exports.scanTicket = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId)
      .populate("user", "name email phone")
      .populate({
        path: "show",
        populate: [
          { path: "movie", select: "title" },
          { path: "theatre", select: "name location" }
        ]
      });

    if (!booking) return res.status(404).json({ message: "Invalid ticket" });

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Ticket is cancelled" });
    }

    // expire after show time
    if (new Date() > new Date(booking.show.showTime)) {
      return res.status(400).json({ message: "Ticket expired (show finished)" });
    }

    // already scanned
    if (booking.isScanned) {
      return res.status(400).json({
        message: "Ticket already used",
        scannedAt: booking.scannedAt
      });
    }

    booking.isScanned = true;
    booking.scannedAt = new Date();
    await booking.save();

    res.json({
      message: "Ticket valid - entry allowed",
      bookingDetails: {
        bookingId: booking._id,
        user: booking.user,
        movie: booking.show.movie,
        theatre: booking.show.theatre,
        showTime: booking.show.showTime,
        seats: booking.seats,
        totalPrice: booking.totalPrice
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};