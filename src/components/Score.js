import ScoreStyles from "./css_modules/ScoreStyles.module.css";

const Score = ({ score }) => {
  return (
    <div
      style={{ height: "11vh", justifyContent: "center" }}
      className={ScoreStyles.scoreContainer}
    >
      <div>SCORE</div>
      <div className={ScoreStyles.score}>{score}</div>
    </div>
  );
};

export default Score;
