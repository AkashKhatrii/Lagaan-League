import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { API } from "../config";

function ViewScoreboard() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastMatchId, setLastMatchId] = useState("");
  const [lastMatchTeam1, setLastMatchTeam1] = useState("");
  const [lastMatchTeam2, setLastMatchTeam2] = useState("");
  const [scoreDeltas, setScoreDeltas] = useState({});
  const [rankDeltas, setRankDeltas] = useState({});

  useEffect(() => {
    axios
      .get(`${API}/api/games`)
      .then((res) =>
        setGames(res.data.map((g) => ({ value: g._id, label: g.name })))
      )
      .catch((err) => console.error(err));

    axios
      .get(`${API}/api/leaderboard/last-match`)
      .then((res) => {
        setLastMatchId(res.data.matchId);
        setLastMatchTeam1(res.data.team1);
        setLastMatchTeam2(res.data.team2);
      })
      .catch((err) => console.error(err));
  }, []);

  const fetchScoreboard = async (gameId) => {
    setLoading(true);
    try {
      const playersRes = await axios.get(`${API}/api/players/${gameId}`);
      const sorted = playersRes.data.sort((a, b) => b.score - a.score);
      setPlayers(sorted);

      // Fetch deltas separately so scoreboard still loads if this fails
      let changesData = { current: null, previous: null };
      try {
        const changesRes = await axios.get(`${API}/api/leaderboard/${gameId}/changes`);
        changesData = changesRes.data;
      } catch {
        // endpoint may not be deployed yet — skip deltas
      }

      const { current, previous } = changesData;
      if (current && previous) {
        const prevScoreMap = {};
        const prevRankMap = {};
        const prevSorted = [...previous.scores].sort(
          (a, b) => b.score - a.score
        );
        prevSorted.forEach((entry, i) => {
          prevScoreMap[entry.player] = entry.score;
          prevRankMap[entry.player] = i + 1;
        });

        const curRankMap = {};
        sorted.forEach((p, i) => {
          curRankMap[p.name] = i + 1;
        });

        const deltas = {};
        const ranks = {};
        sorted.forEach((p) => {
          const prevScore = prevScoreMap[p.name] ?? 0;
          deltas[p.name] = Math.round(p.score) - Math.round(prevScore);
          const prevRank = prevRankMap[p.name] ?? sorted.length;
          const curRank = curRankMap[p.name];
          ranks[p.name] = prevRank - curRank;
        });
        setScoreDeltas(deltas);
        setRankDeltas(ranks);
      } else {
        setScoreDeltas({});
        setRankDeltas({});
      }
    } catch (err) {
      console.error("Failed to load scoreboard", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGameSelect = (option) => {
    setSelectedGame(option);
    fetchScoreboard(option.value);
  };

  const getRankDisplay = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return index + 1;
  };

  const getRowBg = (index) => {
    if (index === 0) return "bg-gradient-to-r from-yellow-500/30 to-yellow-400/10 border-yellow-500/40";
    if (index === 1) return "bg-gradient-to-r from-gray-300/30 to-gray-200/10 border-gray-400/40";
    if (index === 2) return "bg-gradient-to-r from-amber-700/25 to-amber-600/10 border-amber-600/40";
    return "bg-white/5 border-white/10";
  };

  const formatDelta = (val) => {
    if (val === undefined || val === 0) return null;
    if (val > 0)
      return <span className="text-emerald-400 font-semibold text-xs sm:text-sm">+{val}</span>;
    return <span className="text-red-400 font-semibold text-xs sm:text-sm">{val}</span>;
  };

  const formatRankDelta = (val) => {
    if (val === undefined || val === 0)
      return <span className="text-gray-500 text-xs">—</span>;
    if (val > 0)
      return <span className="text-emerald-400 text-xs font-bold">↑{val}</span>;
    return <span className="text-red-400 text-xs font-bold">↓{Math.abs(val)}</span>;
  };

  // Custom styles for react-select on dark background
  const selectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "0.75rem",
      borderColor: "rgba(255,255,255,0.2)",
      backgroundColor: "rgba(255,255,255,0.08)",
      padding: "4px",
      fontSize: "0.95rem",
      color: "#fff",
      boxShadow: "none",
    }),
    singleValue: (base) => ({ ...base, color: "#fff" }),
    placeholder: (base) => ({ ...base, color: "rgba(255,255,255,0.4)" }),
    input: (base) => ({ ...base, color: "#fff" }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.75rem",
      backgroundColor: "#1a1145",
      border: "1px solid rgba(255,255,255,0.15)",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "rgba(139,92,246,0.3)" : "transparent",
      color: "#fff",
      cursor: "pointer",
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1145] to-[#24243e] py-8 px-3 sm:px-6">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            🏏 Lagaan League
          </h1>
          <p className="text-purple-300 text-sm font-medium">Leaderboard</p>
        </div>

        {/* Game selector */}
        <div>
          <label className="block text-sm font-semibold text-purple-300 mb-2">
            Select Game
          </label>
          <Select
            options={games}
            value={selectedGame}
            onChange={handleGameSelect}
            placeholder="Choose a game..."
            styles={selectStyles}
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-400 text-lg font-medium py-10">
            Loading...
          </div>
        ) : (
          selectedGame && (
            <>
              {/* Last match badge */}
              {lastMatchId && (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xs text-gray-400 font-medium">
                    After Match{" "}
                    <span className="text-white font-bold">{lastMatchId}</span>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                    <img
                      src={`/images/${lastMatchTeam1.toLowerCase()}.png`}
                      alt={lastMatchTeam1}
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      title={lastMatchTeam1}
                    />
                    <span className="text-sm font-bold text-gray-300">vs</span>
                    <img
                      src={`/images/${lastMatchTeam2.toLowerCase()}.png`}
                      alt={lastMatchTeam2}
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      title={lastMatchTeam2}
                    />
                  </div>
                </div>
              )}

              {/* Scoreboard */}
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="grid grid-cols-[2.5rem_1fr_4rem_3.5rem_2.5rem] sm:grid-cols-[3rem_1fr_5rem_4rem_3rem] items-center px-3 sm:px-4 py-3 bg-purple-900/60 border-b border-white/10 text-xs sm:text-sm font-bold text-purple-300 uppercase tracking-wider">
                  <div>#</div>
                  <div>Player</div>
                  <div className="text-right">Score</div>
                  <div className="text-right">+/-</div>
                  <div className="text-center"></div>
                </div>

                {players.map((player, i) => (
                  <div
                    key={player._id}
                    className={`grid grid-cols-[2.5rem_1fr_4rem_3.5rem_2.5rem] sm:grid-cols-[3rem_1fr_5rem_4rem_3rem] items-center px-3 sm:px-4 py-2.5 sm:py-3 border-b ${getRowBg(i)} transition-colors`}
                  >
                    <div className="text-sm sm:text-base font-bold text-white">
                      {getRankDisplay(i)}
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-white truncate pr-2">
                      {player.name}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white text-right tabular-nums">
                      {Math.round(player.score)}
                    </div>
                    <div className="text-right tabular-nums">
                      {formatDelta(scoreDeltas[player.name])}
                    </div>
                    <div className="text-center">
                      {formatRankDelta(rankDeltas[player.name])}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )
        )}

        <div className="text-center text-[10px] text-gray-500 pt-2">
          lagaan-league.vercel.app
        </div>
      </div>
    </div>
  );
}

export default ViewScoreboard;
