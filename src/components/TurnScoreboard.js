import React from 'react';
import styles from './css_modules/TurnScoreboard.module.css';

const TurnScoreboard = ({ userHealth, aiHealth }) => (
  <div className={styles.scoreboard}>
    <div className={styles.health}>
      <span>User Health: {userHealth}</span>
    </div>
    <div className={styles.health}>
      <span>AI Health: {aiHealth}</span>
    </div>
  </div>
);

export default TurnScoreboard;
