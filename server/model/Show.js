const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true
    },

    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      required: true
    },

    showTime: { type: Date, required: true },

    seatLayout: { type: [String], required: true },
    bookedSeats: { type: [String], default: [] },

    seatPrices: {
      type: Object,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Show", showSchema);