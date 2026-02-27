const Show = require("../model/Show");
const Theatre = require("../model/Theatre");
const Movie = require("../model/Movie");
const { generateSeatLayout } = require("../utils/seatGenerator");

/* =========================
   ADD SHOW (ADMIN)
========================= */
exports.addShow = async (req, res) => {
  try {
    const { movie, theatre, showTime, seatPrices } = req.body;

    const movieExists = await Movie.findById(movie);
    if (!movieExists) return res.status(404).json({ message: "Movie not found" });

    const theatreExists = await Theatre.findById(theatre);
    if (!theatreExists) return res.status(404).json({ message: "Theatre not found" });

    if (!seatPrices || typeof seatPrices !== "object") {
      return res.status(400).json({
        message: "seatPrices is required (example: { A:300, B:250 })"
      });
    }

    const seatLayout = generateSeatLayout(theatreExists.rows, theatreExists.columns);

    const show = await Show.create({
      movie,
      theatre,
      showTime,
      seatLayout,
      bookedSeats: [],
      seatPrices
    });

    res.status(201).json({ message: "Show added successfully", show });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================
   GET SHOWS BY MOVIE (PUBLIC)
========================= */
exports.getShowsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const shows = await Show.find({ movie: movieId })
      .populate("movie", "title poster.url duration language")
      .populate("theatre", "name location rows columns");

    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================
   GET SHOW SEATS (PUBLIC)
========================= */
exports.getShowSeats = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate("movie", "title poster.url")
      .populate("theatre", "name location rows columns");

    if (!show) return res.status(404).json({ message: "Show not found" });

    const totalSeats = show.seatLayout.length;
    const booked = show.bookedSeats.length;
    const available = totalSeats - booked;

    res.json({
      showId: show._id,
      movie: show.movie,
      theatre: show.theatre,
      showTime: show.showTime,
      seatPrices: show.seatPrices,
      totalSeats,
      availableSeatsCount: available,
      bookedSeats: show.bookedSeats,
      seatLayout: show.seatLayout
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};