import React, { useState } from "react";
import Character from "./TurnCharacter";
import TurnActionButtons from "./TurnActionButtons";
import RewardClaim from "./RewardClaim";
import styles from "./css_modules/TurnGameScene.module.css";

const TurnGameScene = () => {
  const [userHealth, setUserHealth] = useState(100);
  const [aiHealth, setAiHealth] = useState(100);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [isUserAttacked, setIsUserAttacked] = useState(false);
  const [isUserHealed, setIsUserHealed] = useState(false);
  const [isAiAttacked, setIsAiAttacked] = useState(false);
  const [isAiHealed, setIsAiHealed] = useState(false);

  const calculateDamage = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const resetAnimations = () => {
    setIsUserAttacked(false);
    setIsUserHealed(false);
    setIsAiAttacked(false);
    setIsAiHealed(false);
  };

  const checkGameOver = (updatedUserHealth, updatedAiHealth) => {
    if (updatedUserHealth <= 0 && updatedAiHealth <= 0) {
      setGameOver(true);
      setMessage("It's a tie! Both players have fallen.");
      return true;
    } else if (updatedUserHealth <= 0) {
      setGameOver(true);
      setMessage("Game Over! You lost.");
      return true;
    } else if (updatedAiHealth <= 0) {
      setGameOver(true);
      setMessage("Congratulations! You won.");
      return true;
    }
    return false;
  };

  const handleUserAction = (action) => {
    if (!isUserTurn || gameOver) return;

    resetAnimations();
    let userMessage = "";
    let updatedAiHealth = aiHealth;
    let updatedUserHealth = userHealth;

    if (action === "attack") {
      const damage = calculateDamage(10, 20);
      updatedAiHealth = Math.max(aiHealth - damage, 0);
      setAiHealth(updatedAiHealth);
      setIsAiAttacked(true);
      userMessage = `You attacked and dealt ${damage} damage!`;
    } else if (action === "defend") {
      // Only allow healing if user health is below 100
      if (userHealth < 100) {
        const heal = calculateDamage(5, 10);
        updatedUserHealth = Math.min(userHealth + heal, 100);
        setUserHealth(updatedUserHealth);
        setIsUserHealed(true);
        userMessage = `You defended and restored ${heal} health!`;
      } else {
        userMessage = "Your health is already full!";
      }
    }

    setMessage(userMessage);
    setIsUserTurn(false);

    if (!checkGameOver(updatedUserHealth, updatedAiHealth)) {
      setTimeout(() => {
        handleAiAction();
      }, 1000);
    }
  };

  const handleAiAction = () => {
    if (gameOver) return;

    resetAnimations();
    let aiMessage = "";
    let updatedAiHealth = aiHealth;
    let updatedUserHealth = userHealth;

    const action = Math.random() > 0.3 ? "attack" : "defend";

    if (action === "attack") {
      const damage = calculateDamage(10, 20);
      updatedUserHealth = Math.max(userHealth - damage, 0);
      setUserHealth(updatedUserHealth);
      setIsUserAttacked(true);
      aiMessage = `AI attacked and dealt ${damage} damage!`;
    } else if (action === "defend") {
      // Only allow healing if AI health is below 100
      if (aiHealth < 100) {
        const heal = calculateDamage(3, 8);
        updatedAiHealth = Math.min(aiHealth + heal, 100);
        setAiHealth(updatedAiHealth);
        setIsAiHealed(true);
        aiMessage = `AI defended and restored ${heal} health!`;
      } else {
        aiMessage = "AI's health is already full!";
      }
    }

    setMessage(aiMessage);
    setIsUserTurn(true);

    checkGameOver(updatedUserHealth, updatedAiHealth);
  };

  return (
    <>
      {gameOver && userHealth > 0 ? (
        // Show only the RewardClaim component when the user wins
        <div
          style={{
            backgroundColor: "#0d0d17",
            color: "#e0e0e0",
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <RewardClaim
            scoreCheck={userHealth > 0 && aiHealth <= 0}
            score={100} // Or a dynamic score if applicable
            gameName={"turnBasedBattle"}
            resetGame={() => {
              setUserHealth(100);
              setAiHealth(100);
              setIsUserTurn(true);
              setGameOver(false);
              setMessage("");
            }}
          />
        </div>
      ) : (
        // Render the game scene when game is ongoing or when AI wins
        <div className={styles.container}>
          <h3>You</h3>
          <Character
            type="user"
            health={userHealth}
            isAttacked={isUserAttacked}
            isHealed={isUserHealed}
          />
          <h3>AI</h3>
          <Character
            type="ai"
            health={aiHealth}
            isAttacked={isAiAttacked}
            isHealed={isAiHealed}
          />
          <div className={styles.message}>{message}</div>
          {!gameOver ? (
            <TurnActionButtons onAction={handleUserAction} />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default TurnGameScene;
