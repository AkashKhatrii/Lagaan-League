import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-10 space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-purple-700">
          🏏 Lagaan League
        </h1>

        <div className="flex flex-col space-y-4">
          <button
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2 shadow"
            onClick={() => navigate("/create")}
          >
            <span>🎮</span>
            <span>Create Game</span>
          </button>

          <button
            className="w-full py-3 px-4 bg-green-600 text-white rounded-xl text-lg font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2 shadow"
            onClick={() => navigate("/manage")}
          >
            <span>🛠️</span>
            <span>Manage Game</span>
          </button>

          <button
            className="w-full py-3 px-4 bg-purple-600 text-white rounded-xl text-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center space-x-2 shadow"
            onClick={() => navigate("/scoreboard")}
          >
            <span>📊</span>
            <span>View Scoreboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
