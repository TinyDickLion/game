import React from "react";
import LeaderboardStyles from "./css_modules/LeaderboardStyles.module.css";

// Sample leaderboard data
const leaderboardData = [
  { rank: 1, name: "Player1", score: 2500 },
  { rank: 2, name: "Player2", score: 2300 },
  { rank: 3, name: "Player3", score: 2200 },
  { rank: 4, name: "Player4", score: 2100 },
  { rank: 5, name: "Player5", score: 2000 },
];

const Leaderboard = () => {
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
          {leaderboardData.map((player) => (
            <tr key={player.rank} className={LeaderboardStyles.tableRow}>
              <td>{player.rank}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
