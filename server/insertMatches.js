const mongoose = require("mongoose");
require("dotenv").config(); // For loading MONGO_URI from .env

// Define Match model
const MatchSchema = new mongoose.Schema({
  matchId: { type: String, required: true, unique: true },
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  matchDate: { type: String, required: true }, // keep as string (dd-MMM-yy)
});

const Match = mongoose.model("Match", MatchSchema);

const matches = [
  { matchId: 1, team1: "RCB", team2: "SRH", matchDate: "28-Mar-26" },
  { matchId: 2, team1: "MI", team2: "KKR", matchDate: "29-Mar-26" },
  { matchId: 3, team1: "RR", team2: "CSK", matchDate: "30-Mar-26" },
  { matchId: 4, team1: "PBKS", team2: "GT", matchDate: "31-Mar-26" },
  { matchId: 5, team1: "LSG", team2: "DC", matchDate: "01-Apr-26" },
  { matchId: 6, team1: "KKR", team2: "SRH", matchDate: "02-Apr-26" },
  { matchId: 7, team1: "CSK", team2: "PBKS", matchDate: "03-Apr-26" },
  { matchId: 8, team1: "DC", team2: "MI", matchDate: "04-Apr-26" },
  { matchId: 9, team1: "GT", team2: "RR", matchDate: "04-Apr-26" },
  { matchId: 10, team1: "SRH", team2: "LSG", matchDate: "05-Apr-26" },
  { matchId: 11, team1: "RCB", team2: "CSK", matchDate: "05-Apr-26" },
  { matchId: 12, team1: "KKR", team2: "PBKS", matchDate: "06-Apr-26" },
  { matchId: 13, team1: "RR", team2: "MI", matchDate: "07-Apr-26" },
  { matchId: 14, team1: "DC", team2: "GT", matchDate: "08-Apr-26" },
  { matchId: 15, team1: "KKR", team2: "LSG", matchDate: "09-Apr-26" },
  { matchId: 16, team1: "RR", team2: "RCB", matchDate: "10-Apr-26" },
  { matchId: 17, team1: "PBKS", team2: "SRH", matchDate: "11-Apr-26" },
  { matchId: 18, team1: "CSK", team2: "DC", matchDate: "11-Apr-26" },
  { matchId: 19, team1: "LSG", team2: "GT", matchDate: "12-Apr-26" },
  { matchId: 20, team1: "MI", team2: "RCB", matchDate: "12-Apr-26" },
  { matchId: 21, team1: "SRH", team2: "RR", matchDate: "13-Apr-26" },
  { matchId: 22, team1: "CSK", team2: "KKR", matchDate: "14-Apr-26" },
  { matchId: 23, team1: "RCB", team2: "LSG", matchDate: "15-Apr-26" },
  { matchId: 24, team1: "MI", team2: "PBKS", matchDate: "16-Apr-26" },
  { matchId: 25, team1: "GT", team2: "KKR", matchDate: "17-Apr-26" },
  { matchId: 26, team1: "RCB", team2: "DC", matchDate: "18-Apr-26" },
  { matchId: 27, team1: "SRH", team2: "CSK", matchDate: "18-Apr-26" },
  { matchId: 28, team1: "KKR", team2: "RR", matchDate: "19-Apr-26" },
  { matchId: 29, team1: "PBKS", team2: "LSG", matchDate: "19-Apr-26" },
  { matchId: 30, team1: "GT", team2: "MI", matchDate: "20-Apr-26" },
  { matchId: 31, team1: "SRH", team2: "DC", matchDate: "21-Apr-26" },
  { matchId: 32, team1: "LSG", team2: "RR", matchDate: "22-Apr-26" },
  { matchId: 33, team1: "MI", team2: "CSK", matchDate: "23-Apr-26" },
  { matchId: 34, team1: "RCB", team2: "GT", matchDate: "24-Apr-26" },
  { matchId: 35, team1: "DC", team2: "PBKS", matchDate: "25-Apr-26" },
  { matchId: 36, team1: "RR", team2: "SRH", matchDate: "25-Apr-26" },
  { matchId: 37, team1: "GT", team2: "CSK", matchDate: "26-Apr-26" },
  { matchId: 38, team1: "LSG", team2: "KKR", matchDate: "26-Apr-26" },
  { matchId: 39, team1: "DC", team2: "RCB", matchDate: "27-Apr-26" },
  { matchId: 40, team1: "PBKS", team2: "RR", matchDate: "28-Apr-26" },
  { matchId: 41, team1: "MI", team2: "SRH", matchDate: "29-Apr-26" },
  { matchId: 42, team1: "GT", team2: "RCB", matchDate: "30-Apr-26" },
  { matchId: 43, team1: "RR", team2: "DC", matchDate: "01-May-26" },
  { matchId: 44, team1: "CSK", team2: "MI", matchDate: "02-May-26" },
  { matchId: 45, team1: "SRH", team2: "KKR", matchDate: "03-May-26" },
  { matchId: 46, team1: "GT", team2: "PBKS", matchDate: "03-May-26" },
  { matchId: 47, team1: "MI", team2: "LSG", matchDate: "04-May-26" },
  { matchId: 48, team1: "RCB", team2: "MI", matchDate: "10-May-26" },
  { matchId: 49, team1: "PBKS", team2: "DC", matchDate: "11-May-26" },
  { matchId: 50, team1: "GT", team2: "SRH", matchDate: "12-May-26" },
  { matchId: 51, team1: "RCB", team2: "KKR", matchDate: "13-May-26" },
  { matchId: 52, team1: "PBKS", team2: "MI", matchDate: "14-May-26" },
  { matchId: 53, team1: "LSG", team2: "CSK", matchDate: "15-May-26" },
  { matchId: 54, team1: "KKR", team2: "GT", matchDate: "16-May-26" },
  { matchId: 55, team1: "RCB", team2: "PBKS", matchDate: "17-May-26" },
  { matchId: 56, team1: "RR", team2: "DC", matchDate: "17-May-26" },
  { matchId: 57, team1: "CSK", team2: "SRH", matchDate: "18-May-26" },
  { matchId: 58, team1: "RR", team2: "LSG", matchDate: "19-May-26" },
  { matchId: 59, team1: "KKR", team2: "MI", matchDate: "20-May-26" },
  { matchId: 60, team1: "CSK", team2: "GT", matchDate: "21-May-26" },
  { matchId: 61, team1: "SRH", team2: "RCB", matchDate: "22-May-26" },
  { matchId: 62, team1: "LSG", team2: "PBKS", matchDate: "23-May-26" },
  { matchId: 63, team1: "MI", team2: "RR", matchDate: "24-May-26" },
  { matchId: 64, team1: "TBD", team2: "TBD", matchDate: "26-May-26" }, // Qualifier 1
  { matchId: 65, team1: "TBD", team2: "TBD", matchDate: "27-May-26" }, // Eliminator
  { matchId: 66, team1: "TBD", team2: "TBD", matchDate: "29-May-26" }, // Qualifier 2
  { matchId: 67, team1: "TBD", team2: "TBD", matchDate: "31-May-26" }  // Final
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Optional: Clear previous data
    await Match.deleteMany({});
    console.log("Old matches cleared");

    await Match.insertMany(matches);
    console.log("✅ Matches inserted successfully!");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error inserting matches:", err);
    mongoose.disconnect();
  });
