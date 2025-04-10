import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTable, useSortBy } from "react-table";

function IplScoreboardKhatri() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastMatchId, setLastMatchId] = useState();
  const [lastMatchTeam1, setLastMatchTeam1] = useState("");
  const [lastMatchTeam2, setLastMatchTeam2] = useState("");

  useEffect(() => {
    // Fetch fixed IPL 2025 players
    const fetchScoreboard = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://lagaan-league-production.up.railway.app/api/scoreboard/ipl2025"
        );
        console.log(res.data)
        const sorted = res.data.sort((a, b) => b.score - a.score);
        setPlayers(sorted);
      } catch (err) {
        console.error("Failed to load IPL scoreboard", err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch last match info
    axios
      .get("https://lagaan-league-production.up.railway.app/api/leaderboard/last-match")
      .then((res) => {
        setLastMatchId(res.data["matchId"]);
        setLastMatchTeam1(res.data["team1"]);
        setLastMatchTeam2(res.data["team2"]);
      })
      .catch((err) => {
        console.log(err);
      });

    fetchScoreboard();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Rank",
        accessor: (_, i) => i + 1,
        id: "rank",
        Cell: ({ value }) => {
          if (value === 1) return <span title="1st">🥇</span>;
          if (value === 2) return <span title="2nd">🥈</span>;
          if (value === 3) return <span title="3rd">🥉</span>;
          return <span>{value}</span>;
        },
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
          🏏 IPL 2025 Leaderboard
        </h1>

        <div className="flex flex-col items-center gap-2 my-6">
          <div className="text-sm text-gray-500 font-medium">
            After Match: <span className="font-semibold text-gray-700">{lastMatchId}</span>
          </div>

          <div className="flex items-center gap-4 px-6 py-3 bg-gray-100 rounded-full shadow-md">
            <img
              src={`/images/${lastMatchTeam1.toLowerCase()}.png`}
              alt={lastMatchTeam1}
              className="w-10 h-10 object-contain"
              title={lastMatchTeam1}
            />
            <span className="text-xl font-semibold text-gray-700">vs</span>
            <img
              src={`/images/${lastMatchTeam2.toLowerCase()}.png`}
              alt={lastMatchTeam2}
              className="w-10 h-10 object-contain"
              title={lastMatchTeam2}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-600 text-lg font-medium">
            Loading scoreboard...
          </div>
        ) : (
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
                        {...column.getHeaderProps(column.getSortByToggleProps())}
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
        )}
      </div>
    </div>
  );
}

export default IplScoreboardKhatri;
