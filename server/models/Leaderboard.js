const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema(
  {
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
    matchId: String,
    scores: [
      {
        player: String,
        score: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
