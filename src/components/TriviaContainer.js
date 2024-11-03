import React, { useState } from "react";
import styles from "./css_modules/TriviaContainer.module.css";
import TriviaGame from "./TriviaGame";
import RewardClaim from "./RewardClaim";

const TriviaContainer = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Function to handle when the game ends
  const handleGameEnd = (finalScore) => {
    setScore(finalScore);
    setIsGameOver(true);
  };

  // Function to reset the game
  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div className={styles.container}>
      {!gameStarted ? (
        <div className={styles.intro}>
          <h2 className={styles.theme}>Trivia Takedown</h2>
          <button
            className={styles.startButton}
            onClick={() => setGameStarted(true)}
          >
            Start Game
          </button>
        </div>
      ) : !isGameOver ? (
        <TriviaGame onGameEnd={handleGameEnd} />
      ) : (
        <RewardClaim scoreCheck={score >=80} score={score} gameName={"trivia"} resetGame={resetGame} />
      )}
    </div>
  );
};

export default TriviaContainer;
