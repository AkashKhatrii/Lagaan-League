import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import CreateGame from "./pages/CreateGame.jsx";
import ManageGame from "./pages/ManageGame.jsx";
import ViewScoreboard from "./pages/ViewScoreboard.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./index.css";
import IplScoreboardKhatri from "./pages/IplScoreboardKhatri.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/manage" element={<ManageGame />} />
        <Route path="/scoreboard" element={<ViewScoreboard />} />
        <Route path="/dashboard/:gameId" element={<Dashboard />} />
        <Route path="/scoreboard/ipl2025" element={<IplScoreboardKhatri />} />


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
