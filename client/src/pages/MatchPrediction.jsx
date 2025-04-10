import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

function MatchPrediction({ gameId, players }) {
  const [matches, setMatches] = useState([]);
  const [predictedMatchIds, setPredictedMatchIds] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [team1Votes, setTeam1Votes] = useState([]);
  const [team2Votes, setTeam2Votes] = useState([]);
  const [activeVoteTeam, setActiveVoteTeam] = useState("team1");
  const [winner, setWinner] = useState("");
  const [message, setMessage] = useState("");

  const playerOptions = players
    .map((p) => ({ label: p.name, value: p.name }))
    .sort((a, b) => a.label.localeCompare(b.label));

  useEffect(() => {
    axios
      .get("https://lagaan-league-production.up.railway.app/api/matches")
      .then((res) => setMatches(res.data))
      .catch(() => setMatches([]));

    axios
      .get(
        `https://lagaan-league-production.up.railway.app/api/predictions/${gameId}`
      )
      .then((res) => setPredictedMatchIds(res.data))
      .catch(() => setPredictedMatchIds([]));
  }, [gameId]);

  const selectedMatchDetails = matches.find(
    (m) => m.matchId === selectedMatch
  );

  const handlePlayerClick = (name) => {
    if (activeVoteTeam === "team1") {
      const isInTeam = team1Votes.some((p) => p.value === name);
      const newTeam1 = isInTeam
        ? team1Votes.filter((p) => p.value !== name)
        : [...team1Votes, { label: name, value: name }];
      setTeam1Votes(newTeam1);
      setTeam2Votes((prev) => prev.filter((p) => p.value !== name));
    } else if (activeVoteTeam === "team2") {
      const isInTeam = team2Votes.some((p) => p.value === name);
      const newTeam2 = isInTeam
        ? team2Votes.filter((p) => p.value !== name)
        : [...team2Votes, { label: name, value: name }];
      setTeam2Votes(newTeam2);
      setTeam1Votes((prev) => prev.filter((p) => p.value !== name));
    }
  };

  const handleSubmitPrediction = async () => {
    if (!selectedMatch || !winner) {
      setMessage("⚠️ Please select a match and winning team.");
      return;
    }
    try {
      await axios.post(
        "https://lagaan-league-production.up.railway.app/api/predictions",
        {
          gameId,
          matchId: selectedMatch,
          votedTeam1: team1Votes.map((p) => p.value),
          votedTeam2: team2Votes.map((p) => p.value),
          winner,
        }
      );
      setMessage("✅ Prediction saved!");
      setSelectedMatch(null);
      setTeam1Votes([]);
      setTeam2Votes([]);
      setWinner("");
      const res = await axios.get(
        `https://lagaan-league-production.up.railway.app/api/predictions/${gameId}`
      );
      setPredictedMatchIds(res.data);
    } catch (err) {
      setMessage("❌ Prediction already exists or an error occurred.");
    }
  };

  const matchOptions = matches
    .filter((m) => !predictedMatchIds.includes(m.matchId))
    .map((m) => ({
      value: m.matchId,
      label: `Match ${m.matchId} — ${m.team1} vs ${m.team2} (${m.matchDate})`,
    }));

  return (
    <div className="w-full mt-5">
      <div className="bg-white rounded-3xl shadow-2xl p-10 space-y-8">
        <h3 className="text-3xl font-extrabold text-center text-purple-700">
          🔮 Match Prediction
        </h3>

        <div className="space-y-2">
          <label className="font-semibold text-gray-800">📅 Select Match</label>
          <Select
            options={matchOptions}
            value={matchOptions.find((opt) => opt.value === selectedMatch)}
            onChange={(opt) => setSelectedMatch(opt.value)}
            placeholder="Choose a match..."
            className="text-left"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "0.75rem",
                borderColor: "#CBD5E0",
                padding: "6px",
                fontSize: "0.95rem",
              }),
              menu: (base) => ({
                ...base,
                borderRadius: "0.75rem",
                zIndex: 10,
              }),
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold text-gray-800">👥 Select Voters</label>

          <div className="flex gap-4 mb-2">
            <button
              onClick={() => setActiveVoteTeam("team1")}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                activeVoteTeam === "team1"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Select voters for {selectedMatchDetails?.team1 || "Team 1"}
            </button>
            <button
              onClick={() => setActiveVoteTeam("team2")}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                activeVoteTeam === "team2"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Select voters for {selectedMatchDetails?.team2 || "Team 2"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {playerOptions.map((player) => {
              const name = player.value;
              const isTeam1 = team1Votes.some((p) => p.value === name);
              const isTeam2 = team2Votes.some((p) => p.value === name);
              const isSelected = isTeam1 || isTeam2;
              const isActive =
                (activeVoteTeam === "team1" && isTeam1) ||
                (activeVoteTeam === "team2" && isTeam2);

              return (
                <button
                  key={name}
                  onClick={() => handlePlayerClick(name)}
                  className={`px-4 py-1 rounded-full text-sm font-medium border shadow-sm transition ${
                    isSelected
                      ? isActive
                        ? activeVoteTeam === "team1"
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-green-500 text-white border-green-500"
                        : "bg-gray-300 text-gray-700 line-through"
                      : "bg-white text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {name} ✕
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-gray-800">🏆 Select Final Match Winner</p>
          <div className="flex space-x-4">
            <button
              onClick={() => setWinner("team1")}
              className={`py-2 px-6 rounded-full transition text-sm font-semibold shadow-sm border ${
                winner === "team1"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {selectedMatchDetails?.team1 || "Team 1"}
            </button>
            <button
              onClick={() => setWinner("team2")}
              className={`py-2 px-6 rounded-full transition text-sm font-semibold shadow-sm border ${
                winner === "team2"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {selectedMatchDetails?.team2 || "Team 2"}
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmitPrediction}
          className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 text-lg font-semibold shadow-lg transition"
        >
          ✨ Submit Prediction
        </button>

        {message && (
          <div className="text-center text-sm pt-2 font-medium text-gray-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchPrediction;
