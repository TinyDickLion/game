// TriviaGame.js
import React, { useState, useEffect } from "react";
import styles from "./css_modules/TriviaContainer.module.css";
import questionsData from "./questionsData"; // Sample question data file

const TriviaGame = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 10);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    if (questionIndex < questionsData.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setIsGameOver(true);
    }
  };

  return (
    <div className={styles.gameContainer}>
      {!isGameOver ? (
        <>
          <div className={styles.questionSection}>
            <h3 className={styles.questionText}>
              {questionsData[questionIndex].question}
            </h3>
            <div className={styles.answerOptions}>
              {questionsData[questionIndex].options.map((option, i) => (
                <button
                  key={i}
                  className={styles.answerButton}
                  onClick={() => handleAnswer(option.isCorrect)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
          <br></br>
          <div className={styles.scoreboard}>
            <p>Score: {score}</p>
            <p>Streak: {streak}</p>
          </div>
        </>
      ) : (
        <div className={styles.finalScore}>
          <h3>Your Final Score: {score}</h3>
        </div>
      )}
    </div>
  );
};

export default TriviaGame;
