import React, { useState, useEffect } from "react";
import axios from "axios";
import qrcode from "../images/qr.png";
import { algoIndexerClient } from "../algorand/config";
import RestartGameStyles from "./css_modules/RestartGameStyles.module.css";

const RewardClaim = ({ score, resetGame }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [hasOptedIn, setHasOptedIn] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [disable, setDisable] = useState(false);

  const API_BASE_URL = "https://tdld-api.onrender.com/api/v1";
  const ASSET_ID = 2176744157;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    // Detect when user returns to the app
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        localStorage.getItem("waitingForOptIn")
      ) {
        // User returned from Pera Wallet
        localStorage.removeItem("waitingForOptIn");
        setFeedbackMessage(
          "Welcome back! Please re-enter your wallet address to claim your reward."
        );
        setCurrentStep(2);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (score >= 100 && walletAddress) {
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
          "Opt-in successful! Please enter your address to claim your reward."
        );
        setCurrentStep(2);
      } else {
        setFeedbackMessage(
          "You need to opt-in to the TDLD token. Then re-enter your address, to continue the claim process"
        );
        if (isMobile && walletAddress.length > 0) {
          handleMobileRedirect();
        }
      }
    } catch (error) {
      console.error("Error checking opt-in status:", error);
      setFeedbackMessage("Error checking opt-in status. Please try again.");
    }
  };

  // Handle mobile redirect for opt-in
  const handleMobileRedirect = () => {
    const paymentUrl = `perawallet://?amount=0&asset=${ASSET_ID}`;
    localStorage.setItem("waitingForOptIn", true); // Set flag indicating the redirect
    window.location.href = paymentUrl;

    // Clear the wallet address after redirect
    setWalletAddress("");
  };

  // Handle reward claim process
  const handleClaimReward = async () => {
    if (!walletAddress) {
      setFeedbackMessage(
        "Please enter your wallet address to claim the reward."
      );
      return;
    }

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
    } finally {
      setDisable(false);
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
    <div className={RestartGameStyles.rewardClaimWrapper}>
      <br></br>
      <div className={RestartGameStyles.feedbackMessage}>
        {feedbackMessage && <p>{feedbackMessage}</p>}
      </div>
      <br></br>
      {/* Step 1: Opt-in process */}
      {currentStep === 1 && (
        <div className={RestartGameStyles.stepContainer}>
          <h2 className={RestartGameStyles.stepTitle}>
            Enter Wallet Address to Opt-in to $TDLD and Claim Your Reward!
          </h2>
          <input
            type="text"
            placeholder="Enter your wallet address"
            value={walletAddress}
            onChange={handleInputChange}
            className={RestartGameStyles.walletInput}
          />
          {!hasOptedIn && !isMobile && (
            <div className={RestartGameStyles.stepContainer}>
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
          <h2 className={RestartGameStyles.stepTitle}>Claim Your Reward</h2>
          <input
            type="text"
            placeholder="Enter your wallet address"
            value={walletAddress}
            onChange={handleInputChange}
            onPaste={handleInputChange}
            className={RestartGameStyles.walletInput}
          />
          <button
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
    </div>
  );
};

export default RewardClaim;
