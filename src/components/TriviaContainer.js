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
          <br></br>
          <p className={styles.description}>
            Aim to score above <strong>80</strong> points for a chance to claim
            $TDLD rewards!
          </p>
          <br></br>
          <br></br>
          <button
            className={styles.startButton}
            onClick={() => setGameStarted(true)}
          >
            Start Game
          </button>
        </div>
      ) : !isGameOver ? (
        <TriviaGame onGameEnd={handleGameEnd} />
      ) : score >= 80 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className={styles.congratsContainer}
        >
          <h1 className={styles.congratsMessage}>Congratulations!</h1>
          <br></br>
          <p className={styles.winMessage}>
            You scored <strong>{score}</strong> points
          </p>
          <RewardClaim
            scoreCheck={score >= 80}
            score={score}
            gameName={"trivia"}
            resetGame={resetGame}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className={styles.retryContainer}
        >
          <h1 className={styles.retryMessage}>Almost There!</h1>
          <br></br>
          <p className={styles.retryDescription}>
            You scored <strong>{score}</strong> points. Try again to reach at
            least 80 and unlock rewards!
          </p>
          <br></br>
          <button className={styles.playAgainButton} onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TriviaContainer;
