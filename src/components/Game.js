import React, { useReducer, useState } from "react";
import GameWrapper from "./GameWrapper";
import HeaderPanel from "./HeaderPanel";
import Board from "./Board";
import ButtonPanel from "./ButtonPanel";
import Score from "./Score";
import RestartGame from "./RestartGame";
import RewardClaim from "./RewardClaim";
import useGame from "../hooks/useGame";
import useGameOver from "../hooks/useGameOver";
import { initialState, handleState } from "../business/jokerState";
import GameStyles from "./css_modules/GameStyles.module.css"; // Add CSS file for styling animations

const Game = () => {
  const [board, setBoard, score, setScore] = useGame();
  const [jokerState, dispatchJokerAction] = useReducer(
    handleState,
    JSON.parse(localStorage.getItem("jokerState")) || initialState
  );
  const [gameOver, setGameOver] = useGameOver(board, jokerState);
  const [showInstructions, setShowInstructions] = useState(true);

  const winningScore = 100;


  // Show interactive instructions for new players
  const handleInstructionsClose = () => {
    setShowInstructions(false);
  };

  return (
    <GameWrapper gameState={gameOver}>
      {showInstructions && (
        <div className={GameStyles.instructions}>
          <h2>Welcome to Match-3 Mania!</h2>
          <p>
            Swap adjacent elements to make a line of 3 or more matching colors.
            Matched elements will be removed, and new ones will fall from above.
          </p>
          <p>Reach 100 points to win and claim your reward!</p>
          <button  className={GameStyles.instructionsbutton} onClick={handleInstructionsClose}>
            Got it, let’s play!
          </button>
        </div>
      )}

      {score < winningScore ? (
        <h1 style={{ color: "white" }}>Score 100 points to Win</h1>
      ) : (
        <h1 style={{ color: "white" }}>You Win!</h1>
      )}
      {score < winningScore ? (
        <>
          <HeaderPanel>
            <Score score={score} />
            <ButtonPanel
              jokers={jokerState}
              dispatchJokerAction={dispatchJokerAction}
            />
          </HeaderPanel>
          <Board
            board={board}
            setBoard={setBoard}
            jokers={jokerState}
            dispatchJokerAction={dispatchJokerAction}
            gameOver={gameOver}
          />
        </>
      ) : (
        <RewardClaim
          score={score}
          resetGame={() => {
            setBoard([]);
            setScore(0);
            setGameOver(false);
          }}
        />
      )}

      {score >= winningScore ? (
        <RestartGame
          resetBoard={setBoard}
          resetScore={setScore}
          resetJokers={dispatchJokerAction}
          resetGameOver={setGameOver}
        />
      ) : (
        <></>
      )}
    </GameWrapper>
  );
};

export default Game;
