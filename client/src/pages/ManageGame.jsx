import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function ManageGame() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/games")
      .then((res) =>
        setGames(
          res.data.map((game) => ({ value: game.name, label: game.name }))
        )
      )
      .catch(() => setError("Failed to fetch games"));
  }, []);

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/games/verify", {
        name: selectedGame.value,
        password,
      });
      navigate(`/dashboard/${res.data.gameId}`);
    } catch (err) {
      setError("❌ Invalid name or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-3xl p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-green-600">
          🛠️ Manage Game
        </h2>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">
            🎮 Select Game
          </label>
          <Select
            options={games}
            value={selectedGame}
            onChange={setSelectedGame}
            placeholder="Choose a game..."
            className="text-left"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "0.75rem",
                borderColor: "#CBD5E0",
                padding: "6px",
                fontSize: "1rem",
              }),
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">
            🔑 Enter Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 font-semibold text-lg transition"
        >
          🔐 Enter Game
        </button>

        {error && (
          <div className="text-red-600 text-center font-medium">{error}</div>
        )}
      </div>
    </div>
  );
}

export default ManageGame;
