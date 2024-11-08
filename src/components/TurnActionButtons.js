import React from 'react';
import styles from './css_modules/TurnActionButtons.module.css';

const TurnActionButtons = ({ onAction }) => (
  <div className={styles.container}>
    <button className={styles.actionButton} onClick={() => onAction('attack')}>
      Attack
    </button>
    <button className={styles.actionButton} onClick={() => onAction('defend')}>
      Heal
    </button>
  </div>
);

export default TurnActionButtons;
