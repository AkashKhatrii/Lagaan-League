const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", GameSchema);
