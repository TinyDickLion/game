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
import qrcode from "../images/qr.png";
import { algoIndexerClient } from "../algorand/config";

const Game = () => {
  const [board, setBoard, score, setScore] = useGame();
  const [jokerState, dispatchJokerAction] = useReducer(
    handleState,
    JSON.parse(localStorage.getItem("jokerState")) || initialState
  );
  const [gameOver, setGameOver] = useGameOver(board, jokerState);
  const [disable, setDisable] = useState(false);
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress") || ""
  );
  const [hasOptedIn, setHasOptedIn] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const winningScore = 100;
  const API_BASE_URL = "https://tdld-api.onrender.com/api/v1";
  const ASSET_ID = 2176744157;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem("walletAddress", walletAddress);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (score >= winningScore && walletAddress) {
      setCurrentStep(1); // Reset to step 1 when user wins
      checkOptInStatus();
    }
  }, [score, walletAddress]);

  // Check if the user has opted into the asset
  const checkOptInStatus = async () => {
    try {
      const accountInfo = await algoIndexerClient
        .lookupAccountByID(walletAddress.toUpperCase())
        .do();
      const optedIn = accountInfo.account.assets?.some(
        (asset) => asset["asset-id"] === ASSET_ID
      );

      setHasOptedIn(optedIn);

      if (optedIn) {
        setFeedbackMessage(
          "Opt-in successful! Please re-enter your address to claim your reward."
        );
        setCurrentStep(2);
      } else {
        setFeedbackMessage(
          "You need to opt-in to the TDLD token to proceed. Then once complete please re enter your wallet address for step 2"
        );
        if (isMobile) {
          handleMobileRedirect();
        }
      }
    } catch (error) {
      console.error("Error checking opt-in status:", error);
    }
  };

  // Handle mobile redirect for opt-in
  const handleMobileRedirect = () => {
    const paymentUrl = `perawallet://?amount=0&asset=${ASSET_ID}`;
    window.location.href = paymentUrl;

    // Clear the wallet address after redirect
    setWalletAddress("");
    localStorage.removeItem("walletAddress");
  };

  // Handle reward claim process
  const handleClaimReward = async () => {
    if (walletAddress.length > 0) {
      setDisable(true);
      setFeedbackMessage("Processing your reward claim...");
      try {
        await axios.post(`${API_BASE_URL}/send-rewards`, {
          to: walletAddress,
          score,
        });

        await updateLeaderboard(walletAddress, score);
        setFeedbackMessage("Reward claimed! Check your wallet for the reward.");
        setCurrentStep(3);
      } catch (error) {
        console.error("Error claiming reward:", error);
        setFeedbackMessage("Failed to claim the reward. Please try again.");
      }
    } else {
      setFeedbackMessage(
        "Please enter your wallet address to claim the reward."
      );
    }
  };

  // Update leaderboard
  const updateLeaderboard = async (name, score) => {
    try {
      await axios.post(`${API_BASE_URL}/update-leaderboard`, { name, score });
      console.log("Leaderboard updated");
    } catch (error) {
      console.error("Failed to update leaderboard:", error);
    }
  };

  // Handle wallet input changes
  const handleInputChange = (e) => {
    const newAddress = e.target.value;
    setWalletAddress(newAddress);

    // Check opt-in status whenever address changes
    if (newAddress && currentStep === 1) {
      checkOptInStatus();
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
          <div className={RestartGameStyles.feedbackMessage}>
            {feedbackMessage && <p>{feedbackMessage}</p>}
            <br></br>
          </div>

          {/* Step 1: Opt-in process */}
          {currentStep === 1 && (
            <div className={RestartGameStyles.stepContainer}>
              <h2 className={RestartGameStyles.stepTitle}>
                Step 1: Opt-In to TDLD Token
              </h2>
              <input
                type="text"
                placeholder="Enter your wallet address"
                value={walletAddress}
                onChange={handleInputChange}
                className={RestartGameStyles.walletInput}
              />
              {!hasOptedIn && !isMobile && (
                <div>
                  <img
                    src={qrcode}
                    alt="QR Code for $TDLD Opt-In"
                    className={RestartGameStyles.qrImage}
                  />
                  <p className={RestartGameStyles.instructions}>
                    Scan the QR code to opt-in to the TDLD token.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Re-enter address for reward claim */}
          {currentStep === 2 && (
            <div className={RestartGameStyles.stepContainer}>
              <h2 className={RestartGameStyles.stepTitle}>
                Step 2: Re-Enter Wallet Address to Claim Reward
              </h2>
              <input
                type="text"
                placeholder="Re-enter your wallet address"
                value={walletAddress}
                onChange={handleInputChange}
                onPaste={handleInputChange}
                className={RestartGameStyles.walletInput}
              />
              <button
                style={{ marginLeft: "0.25em" }}
                className={RestartGameStyles.claimButton}
                disabled={disable}
                onClick={handleClaimReward}
              >
                Claim Reward
              </button>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className={RestartGameStyles.stepContainer}>
              <h2 className={RestartGameStyles.stepTitle}>Reward Claimed!</h2>
              <p className={RestartGameStyles.instructions}>
                Check your wallet for the reward. Thank you for participating!
              </p>
            </div>
          )}

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
