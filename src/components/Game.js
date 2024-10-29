import React, { useReducer, useContext, useState, useEffect } from "react";
import axios from "axios";
import GameWrapper from "./GameWrapper";
import HeaderPanel from "./HeaderPanel";
import Board from "./Board";
import ButtonPanel from "./ButtonPanel";
import Score from "./Score";
import RestartGame from "./RestartGame";
import PeraWalletButton from "./PeraWalletButton";
import { PeraWalletContext } from "./PeraWalletContext";
import { optIn } from "../algorand/opt-in.js";
import { algodClient } from "../algorand/config.js";
import RestartGameStyles from "./css_modules/RestartGameStyles.module.css";
import useGame from "../hooks/useGame";
import useGameOver from "../hooks/useGameOver";
import { initialState, handleState } from "../business/jokerState";

const Game = () => {
  const [board, setBoard, score, setScore] = useGame();
  const [jokerState, dispatchJokerAction] = useReducer(
    handleState,
    JSON.parse(localStorage.getItem("jokerState")) || initialState
  );
  const [gameOver, setGameOver] = useGameOver(board, jokerState);
  const [connectedAccountAddress, setConnectedAccountAddress] = useState(null);
  const [disable, setDisable] = useState(false);
  const peraWallet = useContext(PeraWalletContext);

  const winningScore = 100;
  const API_BASE_URL = "https://tdld-api.onrender.com/api/v1";

  useEffect(() => {
    setConnectedAccountAddress(peraWallet?.connector?.accounts[0]);
  }, [peraWallet]);

  const handleTX = async () => {
    if (connectedAccountAddress?.length > 0) {
      setDisable(true);
      try {
        // Opt-in logic
        let optInTxn = await optIn(connectedAccountAddress, "2176744157");
        const signedTx = await peraWallet.signTransaction([optInTxn]);

        for (const signedTxnGroup of signedTx) {
          const { txId } = await algodClient
            .sendRawTransaction(signedTxnGroup)
            .do();
          console.log(`txns signed successfully! - txID: ${txId}`);
        }

        // Update leaderboard
        await updateLeaderboard(connectedAccountAddress, score);

        // Reward logic
        await axios.post(`${API_BASE_URL}/send-rewards`, {
          to: connectedAccountAddress,
          score,
        });
      } catch (error) {
        console.error("Error handling game win:", error);
      }
    }
  };

  const updateLeaderboard = async (name, score) => {
    try {
      await axios.post(`${API_BASE_URL}/update-leaderboard`, {
        name,
        score,
      });
      console.log("Leaderboard updated");
    } catch (error) {
      console.error("Failed to update leaderboard:", error);
    }
  };

  return (
    <>
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
          <PeraWalletButton />
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
          <div
            style={{ flexDirection: "column" }}
            className={RestartGameStyles.restartGameWrapper}
          >
            <button
              className={RestartGameStyles.restartGame}
              disabled={disable}
              onClick={() => {
                if (score >= winningScore) {
                  handleTX();
                }
              }}
              onTouchStart={() => {
                if (score >= winningScore) {
                  handleTX();
                }
              }}
              onTouchEnd={() => {
                if (score >= winningScore) {
                  handleTX();
                }
              }}
            >
              Claim Reward
            </button>
            <RestartGame
              resetBoard={setBoard}
              resetScore={setScore}
              resetJokers={dispatchJokerAction}
              resetGameOver={setGameOver}
            />
          </div>
        )}
      </GameWrapper>
    </>
  );
};

export default Game;
