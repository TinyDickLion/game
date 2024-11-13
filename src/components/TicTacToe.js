import React, { useState, useEffect } from "react";
import styles from "./css_modules/TicTacToeStyles.module.css";
import RewardClaim from "./RewardClaim";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 board
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const [coinFlipping, setCoinFlipping] = useState(false);
  const [coinResult, setCoinResult] = useState(null);
  const [playerWins, setPlayerWins] = useState(0);
  const [aiWins, setAiWins] = useState(0);
  const [roundCount, setRoundCount] = useState(0);
  const maxRounds = 5;

  useEffect(() => {
    if (showGame && !isXNext && !winner) {
      const aiMove = calculateAIMove(board);
      if (aiMove !== -1) {
        makeMove(aiMove, "O");
      }
    }
  }, [isXNext, winner, showGame]);

  const handleClick = (index) => {
    if (board[index] || winner || !isXNext) return;
    makeMove(index, "X");
  };

  const makeMove = (index, player) => {
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    checkWinner(newBoard);
    setIsXNext(player === "X" ? false : true);
  };

  const calculateAIMove = (newBoard) => {
    const emptyCells = newBoard
      .map((val, index) => (val === null ? index : null))
      .filter((i) => i !== null);

    if (Math.random() < 0.3) {
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i]) {
        newBoard[i] = "O";
        if (checkImmediateWinner(newBoard, "O")) return i;
        newBoard[i] = null;
      }
    }

    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i]) {
        newBoard[i] = "X";
        if (checkImmediateWinner(newBoard, "X")) return i;
        newBoard[i] = null;
      }
    }

    if (!newBoard[4]) return 4;

    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  const checkImmediateWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winningCombinations.some(
      ([a, b, c]) =>
        board[a] === player && board[b] === player && board[c] === player
    );
  };

  const checkWinner = (newBoard) => {
    let roundComplete = false;
    if (checkImmediateWinner(newBoard, "X")) {
      setWinner("X");
      setPlayerWins((wins) => wins + 1);
      roundComplete = true;
    } else if (checkImmediateWinner(newBoard, "O")) {
      setWinner("O");
      setAiWins((wins) => wins + 1);
      roundComplete = true;
    } else if (newBoard.every((cell) => cell !== null)) {
      setWinner("Draw");
      roundComplete = true;
    }

    if (roundComplete) {
      setRoundCount((count) => count + 1);
    }
  };

  const initiateCoinFlip = () => {
    setCoinFlipping(true);
    setTimeout(() => {
      const result = Math.random() < 0.5 ? "Player" : "AI";
      setCoinResult(result);
      setIsXNext(result === "Player");
      setShowGame(true);
      setCoinFlipping(false);
    }, 1000);
  };

  const resetRound = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setShowGame(false);
    initiateCoinFlip();
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setShowGame(false);
    setCoinResult(null);
    setPlayerWins(0);
    setAiWins(0);
    setRoundCount(0);
    initiateCoinFlip();
  };

  return (
    <div className={styles.container}>
      {!showGame ? (
        <div className={styles.coinFlipContainer}>
          <h1 style={{ color: "white" }}>Coin Flip: Who Goes First?</h1>
          <h2 style={{ color: "white" }}>(Best of 5, draw goes to the AI)</h2>
          <div
            className={`${styles.coin} ${coinFlipping ? styles.flipping : ""}`}
            onClick={initiateCoinFlip}
          >
            {coinFlipping ? (
              <></>
            ) : (
              <span>
                {coinResult ? `${coinResult} starts!` : "Flip the Coin"}
              </span>
            )}
          </div>
        </div>
      ) : playerWins >= 3 || aiWins >= 3 || roundCount >= maxRounds ? (
        <div className={styles.rewardContainer}>
          {playerWins >= 3 ? (
            <RewardClaim
              scoreCheck={true}
              gameName={"tic-tac-toe"}
              resetGame={resetGame}
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2 style={{ color: "white" }}>AI Wins the Best of Five!</h2>
              <br></br>
              <button onClick={resetGame} className={styles.playAgainButton}>
                Play Again
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <h1 style={{ color: "white" }}>Tic Tac Toe</h1>
          <div
            className={styles.board}
            style={{ gridTemplateColumns: "repeat(3, 100px)" }}
          >
            {board.map((cell, index) => (
              <div
                key={index}
                className={`${styles.cell} ${
                  cell === "X" ? styles.x : styles.o
                }`}
                onClick={() => handleClick(index)}
              >
                {cell}
              </div>
            ))}
          </div>
          <div className={styles.info}>
            {winner ? (
              <>
                <h2 style={{ color: "white" }}>
                  {winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}
                </h2>
                <button onClick={resetRound} className={styles.resetButton}>
                  Next Round (Coin Flip)
                </button>
                <br></br>
                <br></br>
              </>
            ) : (
              <h2 style={{ color: "white" }}>
                Next Player: {isXNext ? "X" : "O (AI)"}
              </h2>
            )}
            <div>
              <p style={{ color: "white" }}>Player Wins: {playerWins}</p>
              <p style={{ color: "white" }}>AI Wins: {aiWins}</p>
              <p style={{ color: "white" }}>
                Rounds Played: {roundCount} / {maxRounds}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TicTacToe;
