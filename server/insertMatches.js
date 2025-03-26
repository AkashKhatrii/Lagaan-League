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
  { matchId: 1, team1: "KKR", team2: "RCB", matchDate: "22-Mar-25" },
  { matchId: 2, team1: "SRH", team2: "RR", matchDate: "23-Mar-25" },
  { matchId: 3, team1: "CSK", team2: "MI", matchDate: "23-Mar-25" },
  { matchId: 4, team1: "DC", team2: "LSG", matchDate: "24-Mar-25" },
  { matchId: 5, team1: "GT", team2: "PBKS", matchDate: "25-Mar-25" },
  { matchId: 6, team1: "RR", team2: "KKR", matchDate: "26-Mar-25" },
  { matchId: 7, team1: "SRH", team2: "LSG", matchDate: "27-Mar-25" },
  { matchId: 8, team1: "CSK", team2: "RCB", matchDate: "28-Mar-25" },
  { matchId: 9, team1: "GT", team2: "MI", matchDate: "29-Mar-25" },
  { matchId: 10, team1: "DC", team2: "SRH", matchDate: "30-Mar-25" },
  { matchId: 11, team1: "RR", team2: "CSK", matchDate: "30-Mar-25" },
  { matchId: 12, team1: "MI", team2: "KKR", matchDate: "31-Mar-25" },
  { matchId: 13, team1: "LSG", team2: "PBKS", matchDate: "01-Apr-25" },
  { matchId: 14, team1: "RCB", team2: "GT", matchDate: "02-Apr-25" },
  { matchId: 15, team1: "KKR", team2: "SRH", matchDate: "03-Apr-25" },
  { matchId: 16, team1: "LSG", team2: "MI", matchDate: "04-Apr-25" },
  { matchId: 17, team1: "CSK", team2: "DC", matchDate: "05-Apr-25" },
  { matchId: 18, team1: "PBKS", team2: "RR", matchDate: "05-Apr-25" },
  { matchId: 19, team1: "KKR", team2: "LSG", matchDate: "06-Apr-25" },
  { matchId: 20, team1: "SRH", team2: "GT", matchDate: "06-Apr-25" },
  { matchId: 21, team1: "MI", team2: "RCB", matchDate: "07-Apr-25" },
  { matchId: 22, team1: "PBKS", team2: "CSK", matchDate: "08-Apr-25" },
  { matchId: 23, team1: "GT", team2: "RR", matchDate: "09-Apr-25" },
  { matchId: 24, team1: "RCB", team2: "DC", matchDate: "10-Apr-25" },
  { matchId: 25, team1: "CSK", team2: "KKR", matchDate: "11-Apr-25" },
  { matchId: 26, team1: "LSG", team2: "GT", matchDate: "12-Apr-25" },
  { matchId: 27, team1: "SRH", team2: "PBKS", matchDate: "12-Apr-25" },
  { matchId: 28, team1: "RR", team2: "RCB", matchDate: "13-Apr-25" },
  { matchId: 29, team1: "DC", team2: "MI", matchDate: "13-Apr-25" },
  { matchId: 30, team1: "LSG", team2: "CSK", matchDate: "14-Apr-25" },
  { matchId: 31, team1: "PBKS", team2: "KKR", matchDate: "15-Apr-25" },
  { matchId: 32, team1: "DC", team2: "RR", matchDate: "16-Apr-25" },
  { matchId: 33, team1: "MI", team2: "SRH", matchDate: "17-Apr-25" },
  { matchId: 34, team1: "RCB", team2: "PBKS", matchDate: "18-Apr-25" },
  { matchId: 35, team1: "GT", team2: "DC", matchDate: "19-Apr-25" },
  { matchId: 36, team1: "RR", team2: "LSG", matchDate: "19-Apr-25" },
  { matchId: 37, team1: "PBKS", team2: "RCB", matchDate: "20-Apr-25" },
  { matchId: 38, team1: "MI", team2: "CSK", matchDate: "20-Apr-25" },
  { matchId: 39, team1: "KKR", team2: "GT", matchDate: "21-Apr-25" },
  { matchId: 40, team1: "LSG", team2: "DC", matchDate: "22-Apr-25" },
  { matchId: 41, team1: "SRH", team2: "MI", matchDate: "23-Apr-25" },
  { matchId: 42, team1: "RCB", team2: "RR", matchDate: "24-Apr-25" },
  { matchId: 43, team1: "CSK", team2: "SRH", matchDate: "25-Apr-25" },
  { matchId: 44, team1: "KKR", team2: "PBKS", matchDate: "26-Apr-25" },
  { matchId: 45, team1: "MI", team2: "LSG", matchDate: "27-Apr-25" },
  { matchId: 46, team1: "DC", team2: "RCB", matchDate: "27-Apr-25" },
  { matchId: 47, team1: "RR", team2: "GT", matchDate: "28-Apr-25" },
  { matchId: 48, team1: "DC", team2: "KKR", matchDate: "29-Apr-25" },
  { matchId: 49, team1: "CSK", team2: "PBKS", matchDate: "30-Apr-25" },
  { matchId: 50, team1: "RR", team2: "MI", matchDate: "01-May-25" },
  { matchId: 51, team1: "GT", team2: "SRH", matchDate: "02-May-25" },
  { matchId: 52, team1: "RCB", team2: "CSK", matchDate: "03-May-25" },
  { matchId: 53, team1: "KKR", team2: "RR", matchDate: "04-May-25" },
  { matchId: 54, team1: "PBKS", team2: "LSG", matchDate: "04-May-25" },
  { matchId: 55, team1: "SRH", team2: "DC", matchDate: "05-May-25" },
  { matchId: 56, team1: "MI", team2: "GT", matchDate: "06-May-25" },
  { matchId: 57, team1: "KKR", team2: "CSK", matchDate: "07-May-25" },
  { matchId: 58, team1: "PBKS", team2: "DC", matchDate: "08-May-25" },
  { matchId: 59, team1: "LSG", team2: "RCB", matchDate: "09-May-25" },
  { matchId: 60, team1: "SRH", team2: "KKR", matchDate: "10-May-25" },
  { matchId: 61, team1: "PBKS", team2: "MI", matchDate: "11-May-25" },
  { matchId: 62, team1: "DC", team2: "GT", matchDate: "11-May-25" },
  { matchId: 63, team1: "CSK", team2: "RR", matchDate: "12-May-25" },
  { matchId: 64, team1: "RCB", team2: "SRH", matchDate: "13-May-25" },
  { matchId: 65, team1: "GT", team2: "LSG", matchDate: "14-May-25" },
  { matchId: 66, team1: "MI", team2: "DC", matchDate: "15-May-25" },
  { matchId: 67, team1: "RR", team2: "PBKS", matchDate: "16-May-25" },
  { matchId: 68, team1: "RCB", team2: "KKR", matchDate: "17-May-25" },
  { matchId: 69, team1: "GT", team2: "CSK", matchDate: "18-May-25" },
  { matchId: 70, team1: "LSG", team2: "SRH", matchDate: "18-May-25" },
  {
    matchId: "match_71",
    team1: "Qualifier 1",
    team2: "-",
    matchDate: "20-May-25",
  },
  {
    matchId: "match_72",
    team1: "Eliminator",
    team2: "-",
    matchDate: "21-May-25",
  },
  {
    matchId: "match_73",
    team1: "Qualifier 2",
    team2: "-",
    matchDate: "23-May-25",
  },
  { matchId: "match_74", team1: "Final", team2: "-", matchDate: "25-May-25" },
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
