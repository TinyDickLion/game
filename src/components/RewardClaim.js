import React, { useState, useEffect } from "react";
import axios from "axios";
import RestartGameStyles from "./css_modules/RestartGameStyles.module.css";
import { algoIndexerClient } from "../algorand/config";

const RewardClaim = ({ score, resetGame }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [eligilbe, setEligilbility] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const API_BASE_URL = "https://tdld-api.onrender.com/api/v1";
  const API_VESTIGE_URL =
    "https://free-api.vestige.fi/asset/2176744157/price?currency=algo";
  const ASSET_ID = 2176744157;
  let minTDLDBalance = 1000000; // Minimum $TDLD balance for 25 ALGO
  let highTDLDBalance = 2000000; // Minimum $TDLD balance for 50 ALGO

  useEffect(() => {
    if (score >= 100 && walletAddress) {
      checkMinimumBalance();
    }
  }, [score, walletAddress]);

  // Check the user's $TDLD balance and update required holdings
  const checkMinimumBalance = async () => {
    try {
      const response = await axios.get(API_VESTIGE_URL);
      const tdldPriceInAlgo = response.data.price;

      // Calculate minimum and high balance based on $TDLD price
      minTDLDBalance = Math.floor(25 / tdldPriceInAlgo);
      highTDLDBalance = Math.floor(50 / tdldPriceInAlgo);

      const accountInfo = await algoIndexerClient
        .lookupAccountByID(walletAddress.toUpperCase())
        .do();
      const tdldAsset = accountInfo?.account?.assets?.find(
        (asset) => asset["asset-id"] === ASSET_ID
      );
      const heldTDLDAmount = tdldAsset.amount / 1000000;

      if (tdldAsset && heldTDLDAmount >= minTDLDBalance) {
        setEligilbility(true);
        if (heldTDLDAmount >= highTDLDBalance) {
          setFeedbackMessage(
            `You have over ${highTDLDBalance} $TDLD, qualifying you for double rewards!`
          );
        } else {
          setFeedbackMessage(
            `You have at least ${minTDLDBalance} $TDLD! You can now claim your reward.`
          );
        }
        setCurrentStep(2);
      } else {
        setEligilbility(false);
        setFeedbackMessage(
          `You need at least ${minTDLDBalance} $TDLD (25 ALGO worth) to claim rewards. Please acquire more and try again.`
        );
      }
    } catch (error) {
      console.error("Error checking $TDLD balance:", error);
      setFeedbackMessage("Error checking $TDLD balance. Please try again.");
    }
  };

  // Handle reward claim process
  const handleClaimReward = async () => {
    if (!walletAddress) {
      setFeedbackMessage(
        "Please enter your wallet address to claim the reward."
      );
      return;
    }

    setFeedbackMessage("Processing your reward claim...");

    try {
      const response = await axios.post(`${API_BASE_URL}/send-rewards`, {
        to: walletAddress,
        score,
      });

      if (response.data.success) {
        setFeedbackMessage(response.data.message);
        setCurrentStep(3);
      } else {
        setFeedbackMessage(response.data.message);
      }
    } catch (error) {
      if (error?.status === 429) {
        setFeedbackMessage(error?.response?.data?.message);
      } else {
        setFeedbackMessage("Failed to claim the reward. Please try again.");
      }
      console.error("Error claiming reward:", error);
    }
  };

  // Handle wallet input changes
  const handleInputChange = (e) => {
    const newAddress = e.target.value;
    if (`${newAddress}`.trim().length < 58) {
      setEligilbility(false);
    }
    setWalletAddress(newAddress);

    if (newAddress && currentStep === 1) {
      checkMinimumBalance();
    }
  };

  return (
    <div className={RestartGameStyles.rewardClaimWrapper}>
      <br></br>
      <div className={RestartGameStyles.feedbackMessage}>
        {feedbackMessage && <p>{feedbackMessage}</p>}
      </div>
      <br></br>

      {/* Step 1: Check $TDLD balance */}
      {currentStep === 1 && (
        <div className={RestartGameStyles.stepContainer}>
          <h2 className={RestartGameStyles.stepTitle}>
            Enter Wallet Address to Check $TDLD Balance
          </h2>
          <input
            type="text"
            placeholder="Enter your wallet address"
            value={walletAddress}
            onChange={handleInputChange}
            className={RestartGameStyles.walletInput}
          />
        </div>
      )}

      {/* Step 2: Claim reward */}
      {currentStep === 2 && (
        <div className={RestartGameStyles.stepContainer}>
          <h2 className={RestartGameStyles.stepTitle}>Claim Your Reward</h2>
          <input
            type="text"
            placeholder="Re-enter your wallet address"
            value={walletAddress}
            onChange={handleInputChange}
            className={RestartGameStyles.walletInput}
          />
          <button
            className={RestartGameStyles.claimButton}
            disabled={!eligilbe}
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
