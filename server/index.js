const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Game = require("./models/Game");
const Player = require("./models/Player");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

mongoose.connection.on("connected", () => {
  console.log("Connected to DB:", mongoose.connection.name); // should print "ipl_game"
});
app.get("/", (req, res) => {
  res.send("API is working!");
});

// POST /api/games - Create a new game
app.post("/api/games", async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check for existing game name
    const existing = await Game.findOne({ name });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Game with this name already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the game
    const game = new Game({ name, password: hashedPassword });
    await game.save();

    res
      .status(201)
      .json({ message: "Game created successfully", gameId: game._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while creating game" });
  }
});

app.get("/api/games", async (req, res) => {
  try {
    const games = await Game.find({}, "name");
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

app.post("/api/games/verify", async (req, res) => {
  const { name, password } = req.body;

  try {
    const game = await Game.findOne({ name });
    if (!game) return res.status(404).json({ error: "Game not found" });

    const isMatch = await bcrypt.compare(password, game.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    res.json({ message: "Access granted", gameId: game._id });
  } catch (err) {
    res.status(500).json({ error: "Error verifying game" });
  }
});

app.get("/api/players/:gameId", async (req, res) => {
  try {
    const players = await Player.find({ gameId: req.params.gameId });
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

app.post("/api/players", async (req, res) => {
  const { gameId, name } = req.body;

  try {
    const existing = await Player.findOne({ gameId, name });
    if (existing)
      return res.status(400).json({ error: "Player already exists." });

    const newPlayer = new Player({ gameId, name });
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(500).json({ error: "Failed to add player." });
  }
});

const Prediction = require("./models/Prediction");
const Leaderboard = require("./models/Leaderboard");

app.post("/api/predictions", async (req, res) => {
  const { gameId, matchId, votedTeam1, votedTeam2, winner } = req.body;

  try {
    // 1. Check if prediction already exists
    const existing = await Prediction.findOne({ gameId, matchId });
    if (existing)
      return res
        .status(400)
        .json({ error: "Prediction already exists for this match." });

    // 2. Save prediction
    await Prediction.create({
      gameId,
      matchId,
      votedTeam1,
      votedTeam2,
      winner,
    });

    // 3. Scoring logic
    const losingTeam = winner === "team1" ? "team2" : "team1";
    const winners = winner === "team1" ? votedTeam1 : votedTeam2;
    const losers = winner === "team1" ? votedTeam2 : votedTeam1;

    const pointsLost = 50 * losers.length;
    const pointsPerWinner =
      losers.length > 0 ? (50 * losers.length) / winners.length : 0;

    // 4. Update scores
    const allPlayers = await Player.find({ gameId });
    const scoreMap = {};

    for (const p of allPlayers) {
      scoreMap[p.name] = p.score;
    }

    for (const name of losers) {
      scoreMap[name] -= 50;
    }

    for (const name of winners) {
      scoreMap[name] += pointsPerWinner;
    }

    // 5. Save updated scores
    for (const name in scoreMap) {
      await Player.updateOne({ gameId, name }, { score: scoreMap[name] });
    }

    // 6. Save to leaderboard history
    const scores = Object.entries(scoreMap).map(([player, score]) => ({
      player,
      score,
    }));
    await Leaderboard.create({ gameId, matchId, scores });

    res.json({ message: "✅ Prediction saved and scores updated!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process prediction" });
  }
});

const Match = require("./models/Match");

app.get("/api/matches", async (req, res) => {
  try {
    const matches = await Match.find().sort({ matchId: 1 }); // Ensures match_1 to match_70 order
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

app.get("/api/predictions/:gameId", async (req, res) => {
  try {
    const predictions = await Prediction.find({ gameId: req.params.gameId });
    const matchIds = predictions.map((p) => p.matchId);
    res.json(matchIds);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch predicted matches" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
