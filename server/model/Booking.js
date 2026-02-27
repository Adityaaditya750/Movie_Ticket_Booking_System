const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    show: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },

    seats: { type: [String], required: true },

    totalPrice: { type: Number, required: true },

    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked"
    },

    qrData: { type: String },
    qrCode: { type: String }, // base64
    qrExpiresAt: { type: Date },

    isScanned: { type: Boolean, default: false },
    scannedAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);