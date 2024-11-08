import React, { useState } from 'react';
import TurnGameScene from './TurnGameScene';
import styles from './css_modules/TurnGameStart.module.css';

const TurnGameStart = () => {
  const [showStory, setShowStory] = useState(true);

  const startGame = () => {
    setShowStory(false);  // Hide story, start game
  };

  return (
    <div className={styles.container}>
      {showStory ? (
        <div className={styles.storyContainer}>
          <h1 className={styles.storyTitle}>The Great Battle Begins!</h1>
          <p className={styles.storyText}>
            Two rivals faced off...
          </p>
          <button className={styles.startButton} onClick={startGame}>
            Start Game
          </button>
        </div>
      ) : (
        <TurnGameScene />
      )}
    </div>
  );
};

export default TurnGameStart;
