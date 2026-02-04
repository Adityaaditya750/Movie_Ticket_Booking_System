const Movie = require("../model/Movie");
const cloudinary = require("../config/cloudinary");

/* =========================
   ADD MOVIE (ADMIN ONLY)
========================= */
exports.addMovie = async (req, res) => {
  try {
    const { title, description, duration, language, genre } = req.body;

    // poster is mandatory
    if (!req.file) {
      return res.status(400).json({ message: "Movie poster is required" });
    }

    // upload ONLY image to cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "movie_posters"
    });

    // store movie details in DB
    const movie = await Movie.create({
      title,
      description,
      duration,
      language,
      genre: genre.split(","), // stored in DB as array
      poster: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id
      }
    });

    res.status(201).json({
      message: "Movie added successfully",
      movie
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================
   GET ALL MOVIES
========================= */
exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};



/* =========================
   UPDATE MOVIE (ADMIN)
========================= */
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const { title, description, duration, language, genre, trailerUrl } =
      req.body;

    // update text fields
    if (title) movie.title = title;
    if (description) movie.description = description;
    if (duration) movie.duration = duration;
    if (language) movie.language = language;
    if (genre) movie.genre = genre.split(",");
    if (trailerUrl) movie.trailerUrl = trailerUrl;

    // if new poster uploaded
    if (req.file) {
      // delete old poster from cloudinary
      if (movie.poster?.public_id) {
        await cloudinary.uploader.destroy(movie.poster.public_id);
      }

      // upload new poster
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "movie_posters"
      });

      movie.poster = {
        url: result.secure_url,
        public_id: result.public_id
      };
    }

    await movie.save();

    res.json({
      message: "Movie updated successfully",
      movie
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================
   DELETE MOVIE (ADMIN)
========================= */
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // delete poster from cloudinary
    if (movie.poster?.public_id) {
      await cloudinary.uploader.destroy(movie.poster.public_id);
    }

    await movie.deleteOne();

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};