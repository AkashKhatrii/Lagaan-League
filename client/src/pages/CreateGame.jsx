import { useState } from "react";
import axios from "axios";

function CreateGame() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleCreateGame = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/games", {
        name,
        password,
      });
      setSuccess("🎉 Game created successfully!");
      setError(null);
      setName("");
      setPassword("");
    } catch (err) {
      setError("❌ Failed to create game (maybe name already exists)");
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-10 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-blue-600">
          🎮 Create New Game
        </h2>

        <input
          type="text"
          placeholder="Game Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow"
          onClick={handleCreateGame}
        >
          ✅ Create Game
        </button>

        {success && (
          <div className="text-green-600 font-medium text-center">
            {success}
          </div>
        )}
        {error && (
          <div className="text-red-500 font-medium text-center">{error}</div>
        )}
      </div>
    </div>
  );
}

export default CreateGame;
