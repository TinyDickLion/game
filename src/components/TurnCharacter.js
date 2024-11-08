// Character.js
import React from 'react';
import styles from './css_modules/TurnCharacter.module.css';
import charone from "../images/charone.jpg";
import chartwo from "../images/chartwo.jpg";

const TurnCharacter = ({ type, health, isAttacked, isHealed }) => (
  <div className={`${styles.character} ${isAttacked ? styles.shake : ''} ${isHealed ? styles.heal : ''}`}>
    <img src={`${type === 'user' ? chartwo : charone}`} alt={`${type} character`} className={styles.image} />
    <div className={styles.health}>Health: {health}</div>
  </div>
);

export default TurnCharacter;
