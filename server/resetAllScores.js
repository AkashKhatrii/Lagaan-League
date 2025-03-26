const mongoose = require("mongoose");
require("dotenv").config(); // For loading MONGO_URI from .env

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const playerSchema = new mongoose.Schema({
  name: String,
  gameId: String,
  score: Number,
});

const Player = mongoose.model("Player", playerSchema);

async function resetScores() {
  try {
    const result = await Player.updateMany({}, { score: 0 });
    console.log(`✅ Updated ${result.modifiedCount} player scores to 0`);
  } catch (err) {
    console.error("❌ Error updating scores:", err);
  } finally {
    mongoose.connection.close();
  }
}

resetScores();
