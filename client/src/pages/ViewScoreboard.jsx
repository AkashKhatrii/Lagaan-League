import { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import axios from "axios";
import { useTable, useSortBy } from "react-table";

function ViewScoreboard() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://lagaan-league-production.up.railway.app/api/games")
      .then((res) =>
        setGames(res.data.map((g) => ({ value: g._id, label: g.name })))
      )
      .catch((err) => console.error(err));
  }, []);

  const fetchScoreboard = async (gameId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://lagaan-league-production.up.railway.app/players/${gameId}`
      );
      const sorted = res.data.sort((a, b) => b.score - a.score);
      setPlayers(sorted);
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

  const columns = useMemo(
    () => [
      {
        Header: "Rank",
        accessor: (_, i) => i + 1,
        id: "rank",
      },
      {
        Header: "Player",
        accessor: "name",
      },
      {
        Header: "Score",
        accessor: (row) => Math.round(row.score),
        id: "score",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: players }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const getRowClass = (index) => {
    if (index === 0) return "bg-[#FFD700]/90 text-black font-semibold"; // Gold
    if (index === 1) return "bg-[#C0C0C0]/90 text-black font-semibold"; // Silver
    if (index === 2) return "bg-[#CD7F32]/90 text-black font-semibold"; // Bronze
    return "bg-white";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-14 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 space-y-10">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 tracking-tight">
          📊 Leaderboard
        </h1>

        <div className="w-full">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            🎮 Select Game
          </label>
          <Select
            options={games}
            value={selectedGame}
            onChange={handleGameSelect}
            placeholder="Choose a game..."
            className="text-left"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "0.75rem",
                borderColor: "#CBD5E0",
                padding: "6px",
                fontSize: "1rem",
                boxShadow: "none",
                transition: "border-color 0.2s ease",
              }),
            }}
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-600 text-lg font-medium">
            Loading scoreboard...
          </div>
        ) : (
          selectedGame && (
            <div className="overflow-x-auto rounded-xl border border-gray-300">
              <table
                {...getTableProps()}
                className="min-w-full table-auto text-sm text-gray-800"
              >
                <thead className="bg-purple-100">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="px-6 py-4 text-left text-base font-bold border-b border-gray-300"
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={`${getRowClass(i)} border-b border-gray-200`}
                      >
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ViewScoreboard;
