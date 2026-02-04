const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const upload = require("../utils/multer");

const {
  addMovie,
  getMovies,
  updateMovie,
  deleteMovie
} = require("../controller/movieController");

// add movie
router.post("/", protect, isAdmin, upload.single("poster"), addMovie);

// get movies
router.get("/", getMovies);

// update movie
router.put(
  "/:id",
  protect,
  isAdmin,
  upload.single("poster"),
  updateMovie
);

// delete movie
router.delete("/:id", protect, isAdmin, deleteMovie);

module.exports = router;
