const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  matchId: { type: Number, required: true, unique: true },
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  matchDate: { type: String, required: true },
});
module.exports = mongoose.model("Match", MatchSchema);
