const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema(
  {
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
    matchId: String,
    votedTeam1: [String],
    votedTeam2: [String],
    winner: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", PredictionSchema);
