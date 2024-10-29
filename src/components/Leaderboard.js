import React, { useEffect, useState } from "react";
import axios from "axios";
import LeaderboardStyles from "./css_modules/LeaderboardStyles.module.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://tdld-api.onrender.com/api/v1";

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/leaderboard`);
        const data = response.data;

        // Assign ranks based on sorted scores
        const rankedData = data
          .sort((a, b) => b.score - a.score)
          .map((entry, index) => ({
            ...entry,
            rank: index + 1,
          }));

        setLeaderboard(rankedData);
      } catch (err) {
        setError("Failed to load leaderboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Add line breaks after every 10 characters
  const formatPlayerName = (name) => {
    if (name.length > 10) {
      return name.match(/.{1,10}/g).join("\n"); // Add a break after every 10 characters
    }
    return name;
  };

  if (loading) {
    return <div className={LeaderboardStyles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={LeaderboardStyles.container}>{error}</div>;
  }

  return (
    <div className={LeaderboardStyles.container}>
      <h1 className={LeaderboardStyles.title}>Weekly Leaders (Coming Soon!)</h1>
      <table className={LeaderboardStyles.table}>
        <thead>
          <tr className={LeaderboardStyles.tableHeader}>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player) => (
            <tr key={player.rank} className={LeaderboardStyles.tableRow}>
              <td>{player.rank}</td>
              <td className={LeaderboardStyles.playerName}>
                {formatPlayerName(player.name)}
              </td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
