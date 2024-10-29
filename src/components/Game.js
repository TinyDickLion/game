import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import GameWrapper from "./GameWrapper";
import HeaderPanel from "./HeaderPanel";
import Board from "./Board";
import ButtonPanel from "./ButtonPanel";
import Score from "./Score";
import RestartGame from "./RestartGame";
import RestartGameStyles from "./css_modules/RestartGameStyles.module.css";
import useGame from "../hooks/useGame";
import useGameOver from "../hooks/useGameOver";
import { initialState, handleState } from "../business/jokerState";
import qrcode from "../images/qr.png"; // Import QR code image
import { algoIndexerClient } from "../algorand/config";

const Game = () => {
  const [board, setBoard, score, setScore] = useGame();
  const [jokerState, dispatchJokerAction] = useReducer(
    handleState,
    JSON.parse(localStorage.getItem("jokerState")) || initialState
  );
  const [gameOver, setGameOver] = useGameOver(board, jokerState);
  const [disable, setDisable] = useState(false);
  const [walletAddress, setWalletAddress] = useState(""); // Wallet address input
  const [hasOptedIn, setHasOptedIn] = useState(false); // Check if user has opted in

  const winningScore = 100;
  const API_BASE_URL = "https://tdld-api.onrender.com/api/v1";
  const ASSET_ID = 2176744157; // Replace with your asset ID

  // Check if the user is on a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (score >= winningScore && walletAddress) {
      checkOptInStatus();
    }
  }, [score, walletAddress]);

  // Check if the user has already opted into the asset
  const checkOptInStatus = async () => {
    try {
      const accountInfo = await algoIndexerClient
        .lookupAccountByID(walletAddress)
        .do();
      const optedIn = accountInfo.account.assets?.some(
        (asset) => asset["asset-id"] === ASSET_ID
      );

      setHasOptedIn(optedIn);
      if (!optedIn && isMobile) {
        handleMobileRedirect();
      }
    } catch (error) {
      console.error("Error checking opt-in status:", error);
    }
  };

  const handleMobileRedirect = () => {
    const paymentUrl = `perawallet://?amount=0&asset=${ASSET_ID}`;

    // Redirect mobile users to Pera Wallet for opt-in
    if (isMobile) {
      window.location.href = paymentUrl;
    }
  };

  const handleTX = async () => {
    if (walletAddress.length > 0) {
      setDisable(true);
      try {
        // Reward logic
        await axios.post(`${API_BASE_URL}/send-rewards`, {
          to: walletAddress,
          score,
        });

        // Update leaderboard
        await updateLeaderboard(walletAddress, score);
      } catch (error) {
        console.error("Error handling game win:", error);
      } finally {
        setDisable(false);
      }
    } else {
      alert("Please enter your wallet address.");
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
        <div className={RestartGameStyles.restartGameWrapper}>
          <div className={RestartGameStyles.qrContainer}>
            <h2 className={RestartGameStyles.qrTitle}>
              {hasOptedIn
                ? "Enter your wallet to claim reward"
                : "Opt-in to TDLD Token"}
            </h2>
            {!hasOptedIn && !isMobile ? (
              <img
                src={qrcode} // Replace with the correct path to your PNG image
                alt="QR Code for $TDLD Opt-In"
                className={RestartGameStyles.qrImage}
              />
            ) : null}
            <input
              type="text"
              placeholder="Enter your wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className={RestartGameStyles.walletInput}
            />
            {hasOptedIn && (
              <button
                className={RestartGameStyles.claimButton}
                disabled={disable}
                onClick={handleTX}
              >
                Claim Reward
              </button>
            )}
          </div>

          <RestartGame
            resetBoard={setBoard}
            resetScore={setScore}
            resetJokers={dispatchJokerAction}
            resetGameOver={setGameOver}
          />
        </div>
      )}
    </GameWrapper>
  );
};

export default Game;
