import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css_modules/TriviaContainer.module.css";

const API_BASE_URL = "https://tdld-api.onrender.com/api/v1";

// Helper function to shuffle an array
const shuffleArray = (array) => {
  return array
    .map((item) => ({ ...item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => {
      delete item.sort;
      return item;
    });
};

const TriviaGame = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/trivia-questions`);

        // Shuffle options for each question and shuffle question order
        const shuffledQuestions = shuffleArray(
          response.data.map((question) => ({
            ...question,
            options: shuffleArray(question.options),
          }))
        );

        setQuestions(shuffledQuestions);
        setLoading(false);
      } catch (err) {
        setError("Failed to load questions.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 10);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setIsGameOver(true);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.gameContainer}>
      {!isGameOver ? (
        <>
          <div className={styles.questionSection}>
            <h3 className={styles.questionText}>
              {questions[questionIndex].question}
            </h3>
            <div className={styles.answerOptions}>
              {questions[questionIndex].options.map((option, i) => (
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
          <br />
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
