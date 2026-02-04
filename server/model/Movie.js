const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    duration: {
      type: Number, // minutes
      required: true
    },
    language: {
      type: String,
      required: true
    },
    genre: {
      type: [String],
      required: true
    },
    poster: {
      url: String,
      public_id: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
