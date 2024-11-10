import React, { useState, useEffect } from "react";
import axios from "axios";
import RestartGameStyles from "./css_modules/RestartGameStyles.module.css";
import { algoIndexerClient } from "../algorand/config";

const RewardClaim = ({ scoreCheck, score, gameName, resetGame }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [eligible, setEligibility] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [supportedTokens, setSupportedTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState("tdld"); // Set default to "tdld"
  const [rewardInfo, setRewardInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = "https://tdld-api.onrender.com/api/v1";

  const tokenDetails = {
    tdld: { assetId: 2176744157, minAlgoValue: 25, rewardPercent: 0.13 },
  };

  useEffect(() => {
    setSupportedTokens(Object.keys(tokenDetails));
    setRewardInfo(tokenDetails["tdld"]); // Set default rewardInfo to "tdld"
  }, []);

  useEffect(() => {
    if (scoreCheck && walletAddress) {
      checkMinimumBalance();
    }
  }, [scoreCheck, walletAddress]);

  const validateWalletAddress = (address) => {
    return address.length === 58; // Example: Length validation for Algorand addresses
  };

  const checkMinimumBalance = async () => {
    if (!validateWalletAddress(walletAddress)) {
      setFeedbackMessage("Invalid wallet address format.");
      return;
    }
    setFeedbackMessage("");
    setIsLoading(true);

    try {
      if (!selectedToken) return;
      const { assetId, minAlgoValue, rewardPercent } =
        tokenDetails[selectedToken];
      const priceUrl = `https://free-api.vestige.fi/asset/${assetId}/price?currency=algo`;
      const response = await axios.get(priceUrl);
      const tokenPriceInAlgo = response.data.price;
      const requiredBalance = Math.floor(minAlgoValue / tokenPriceInAlgo);

      const accountInfo = await algoIndexerClient
        .lookupAccountByID(walletAddress.toUpperCase())
        .do();
      const asset = accountInfo?.account?.assets?.find(
        (asset) => asset["asset-id"] === assetId
      );
      const heldAmount = asset ? asset.amount / 1000000 : 0;

      if (heldAmount >= requiredBalance) {
        setEligibility(true);
        setFeedbackMessage(
          `You qualify for ${rewardPercent}% reward in $${selectedToken.toUpperCase()}!`
        );
        setCurrentStep(2);
      } else {
        setEligibility(false);
        setFeedbackMessage(
          `You need at least ${requiredBalance} ${selectedToken.toUpperCase()} (${minAlgoValue} ALGO worth) to claim rewards.`
        );
      }
    } catch (error) {
      console.error("Error checking balance:", error);
      setFeedbackMessage("Error checking balance. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimReward = async () => {
    if (!walletAddress) {
      setFeedbackMessage(
        "Please enter your wallet address to claim the reward."
      );
      return;
    }
    setFeedbackMessage("Processing your reward claim...");
    setEligibility(false);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/send-rewards`, {
        to: walletAddress,
        score,
        gameName,
        selectedToken,
      });

      if (response.data.success) {
        setFeedbackMessage(response.data.message);
        setCurrentStep(3);
      } else {
        setFeedbackMessage(response.data.message);
      }
    } catch (error) {
      if (error?.response?.data?.message?.length > 0) {
        setFeedbackMessage(error?.response?.data?.message);
      } else {
        setFeedbackMessage("Failed to claim the reward. Please try again.");
        console.error("Error claiming reward:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenSelect = (e) => {
    const token = e.target.value;
    setSelectedToken(token);
    setRewardInfo(tokenDetails[token]);
    setEligibility(false);
    setFeedbackMessage("");
    setCurrentStep(1);
  };

  return (
    <div className={RestartGameStyles.rewardClaimWrapper}>
      <div className={RestartGameStyles.feedbackMessage}>
        {feedbackMessage && <p>{feedbackMessage}</p>}
      </div>

      {currentStep === 1 && (
        <div className={RestartGameStyles.stepContainer}>
          <h2 className={RestartGameStyles.stepTitle}>
            Select a Supported Token
          </h2>
          <select
            onChange={handleTokenSelect}
            value={selectedToken}
            className={RestartGameStyles.selectBox}
          >
            {supportedTokens.map((token) => (
              <option key={token} value={token}>
                ${token.toUpperCase()}
              </option>
            ))}
          </select>

          {rewardInfo && (
            <p className={RestartGameStyles.rewardInfo}>
              For holding {rewardInfo.minAlgoValue} ALGO worth of $
              {selectedToken.toUpperCase()}, you can claim{" "}
              {rewardInfo.rewardPercent}% in ${selectedToken.toUpperCase()}.
            </p>
          )}

          {selectedToken && (
            <input
              type="text"
              placeholder="Enter your wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className={RestartGameStyles.walletInput}
            />
          )}
          <button
            onClick={checkMinimumBalance}
            className={RestartGameStyles.checkButton}
            disabled={isLoading}
          >
            {isLoading ? "Checking..." : "Check Eligibility"}
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className={RestartGameStyles.stepContainer}>
          <h2 className={RestartGameStyles.stepTitle}>Claim Your Reward</h2>
          <button
            onClick={handleClaimReward}
            className={RestartGameStyles.claimButton}
            disabled={!eligible || isLoading}
          >
            {isLoading ? "Processing..." : "Claim Reward"}
          </button>
        </div>
      )}

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
