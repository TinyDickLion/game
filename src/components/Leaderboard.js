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
        const { leaderboard: data } = response.data;

        // Assign ranks based on sorted scores
        const rankedData = data
          .sort((a, b) => b.points - a.points)
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

  const formatPlayerAddress = (address) => {
    if (address?.length > 10) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return address;
  };

  if (loading) {
    return <div className={LeaderboardStyles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={LeaderboardStyles.container}>{error}</div>;
  }

  return (
    <div className={LeaderboardStyles.container}>
      <h1 className={LeaderboardStyles.title}>Weekly Leaders</h1>
      {/* <h3 className={LeaderboardStyles.title}>(Top Ten)</h3> */}
      <div className={LeaderboardStyles.scrollContainer}>
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
              <tr
                key={player.walletAddress}
                className={LeaderboardStyles.tableRow}
              >
                <td>{player.rank}</td>
                <td className={LeaderboardStyles.playerName}>
                  <a
                    href={`https://allo.info/account/${player?.walletAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LeaderboardStyles.link}
                  >
                    {formatPlayerAddress(player.walletAddress)}
                  </a>
                </td>
                <td>{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
