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
    if (!movieExists)
      return res.status(404).json({ message: "Movie not found" });

    const theatreExists = await Theatre.findById(theatre);
    if (!theatreExists)
      return res.status(404).json({ message: "Theatre not found" });

    // AUTO seat layout from theatre rows & columns
    const seatLayout = generateSeatLayout(
      theatreExists.rows,
      theatreExists.columns
    );

    const show = await Show.create({
      movie,
      theatre,
      showTime,
      seatPrices,
      seatLayout,
      bookedSeats: []
    });

    res.status(201).json({
      message: "Show added successfully",
      show
    });
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
      .populate("theatre", "name location totalSeats");

    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================
   GET ALL SHOWS (ADMIN)
========================= */
exports.getAllShows = async (req, res) => {
  const shows = await Show.find()
    .populate("movie", "title")
    .populate("theatre", "name location");

  res.json(shows);
};


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
      bookedSeats: show.bookedSeats,
      availableSeatsCount: available,
      seatLayout: show.seatLayout
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* =========================
   DELETE SHOW (ADMIN)
========================= */
exports.deleteShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    await show.deleteOne();
    res.json({ message: "Show deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
