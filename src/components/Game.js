import React, { useReducer, useState } from "react";
import GameWrapper from "./GameWrapper";
import HeaderPanel from "./HeaderPanel";
import Board from "./Board";
import ButtonPanel from "./ButtonPanel";
import Score from "./Score";
import RestartGame from "./RestartGame";
import useGame from "../hooks/useGame";
import useGameOver from "../hooks/useGameOver";
import { initialState, handleState } from "../business/jokerState";
import RewardClaim from "./RewardClaim";
const Game = () => {
  const [board, setBoard, score, setScore] = useGame();
  const [jokerState, dispatchJokerAction] = useReducer(
    handleState,
    JSON.parse(localStorage.getItem("jokerState")) || initialState
  );
  const [gameOver, setGameOver] = useGameOver(board, jokerState);

  const winningScore = 100;

  return (
    <GameWrapper gameState={gameOver}>
      {score < winningScore ? (
        <h1 style={{ color: "white" }}>Score 100 points to Win</h1>
      ) : (
        <h1 style={{ color: "white" }}>You Win!</h1>
      )}
      <HeaderPanel>
        <Score score={score} />
        <ButtonPanel
          jokers={jokerState}
          dispatchJokerAction={dispatchJokerAction}
        />
      </HeaderPanel>
      {score < winningScore ? (
        <Board
          board={board}
          setBoard={setBoard}
          jokers={jokerState}
          dispatchJokerAction={dispatchJokerAction}
          gameOver={gameOver}
        />
      ) : (
        <RewardClaim score={score} resetGame={() => {
          setBoard([]);
          setScore(0);
          setGameOver(false);
        }} />
      )}

      <RestartGame
        resetBoard={setBoard}
        resetScore={setScore}
        resetJokers={dispatchJokerAction}
        resetGameOver={setGameOver}
      />
    </GameWrapper>
  );
};

export default Game;
