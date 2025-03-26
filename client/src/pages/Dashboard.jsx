import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchPrediction from "./MatchPrediction";
import axios from "axios";

function Dashboard() {
  const { gameId } = useParams();
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [message, setMessage] = useState("");

  const fetchPlayers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/players/${gameId}`
      );
      setPlayers(res.data);
    } catch (err) {
      setMessage("⚠️ Failed to load players");
    }
  };

  const addPlayer = async () => {
    if (!newPlayer.trim()) return;
    try {
      await axios.post(
        "https://lagaan-league-production.up.railway.app/api/players",
        {
          gameId,
          name: newPlayer.trim(),
        }
      );
      setNewPlayer("");
      setMessage("✅ Player added!");
      fetchPlayers();
    } catch (err) {
      setMessage("❌ Error: player may already exist");
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-14 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 space-y-10">
        <h2 className="text-3xl font-extrabold text-center text-purple-700">
          📊 Scoreboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {players.map((player) => (
            <div
              key={player._id}
              className="flex justify-between items-center bg-purple-50 border border-purple-200 p-3 rounded-xl shadow-sm"
            >
              <span className="text-md font-medium text-gray-800">
                👤 {player.name}
              </span>
              <span className="text-md font-semibold text-purple-700">
                🎯 {Math.round(player.score)}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">➕ Add Player</h3>
          <input
            type="text"
            placeholder="Enter player name"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addPlayer();
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:outline-none"
          />
          <button
            onClick={addPlayer}
            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition shadow"
          >
            ➕ Add Player
          </button>
          {message && (
            <div className="text-sm text-center text-gray-700 font-medium">
              {message}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10">
        <MatchPrediction gameId={gameId} players={players} />
      </div>
    </div>
  );
}

export default Dashboard;
