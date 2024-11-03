import React, { useState } from "react";
import styles from "./css_modules/TriviaContainer.module.css";
import TriviaGame from "./TriviaGame";

const TriviaContainer = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className={styles.container}>
      {!gameStarted ? (
        <div className={styles.intro}>
          <h2 className={styles.theme}>Trivia Takedown</h2>
          <br></br>
          <button
            className={styles.startButton}
            onClick={() => setGameStarted(true)}
          >
            Start Game
          </button>
        </div>
      ) : (
        <TriviaGame />
      )}
    </div>
  );
};

export default TriviaContainer;
