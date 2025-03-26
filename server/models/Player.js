const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
  {
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", PlayerSchema);
