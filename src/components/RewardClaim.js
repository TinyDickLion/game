import React, { useState, useEffect } from "react";
import axios from "axios";
import { algoIndexerClient } from "../algorand/config";

import TokenSelectionStep from "./TokenSelectionStep";
import ClaimRewardStep from "./ClaimRewardStep";
import RewardClaimedStep from "./RewardClaimedStep";

import RestartGameStyles from "./css_modules/RestartGameStyles.module.css";

const RewardClaim = ({ scoreCheck, score, gameName, resetGame }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [eligible, setEligibility] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [supportedTokens, setSupportedTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState("tdld");
  const [rewardInfo, setRewardInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = "https://tdld-api.onrender.com/api/v1";

  const tokenDetails = {
    tdld: { assetId: 2176744157, minAlgoValue: 25, rewardPercent: 0.13 },
    bwom: { assetId: 2328010867, minBwomLPValue: 6.9, rewardPercent: 6.9 },
  };
  const bwomStartDate = new Date("2024-11-14");

  // Set supported tokens and default reward info on mount
  useEffect(() => {
    setSupportedTokens(Object.keys(tokenDetails));
    setRewardInfo(tokenDetails["tdld"]);
  }, []);

  // Update reward info for BWOM token dynamically
  useEffect(() => {
    if (selectedToken === "bwom") updateDynamicBwomReward();
    else setRewardInfo(tokenDetails[selectedToken]);
  }, [selectedToken]);

  // Check minimum balance if scoreCheck or walletAddress changes
  useEffect(() => {
    if (scoreCheck && walletAddress) checkMinimumBalance();
  }, [scoreCheck, walletAddress]);

  const calculateDynamicRewardPercent = () => {
    const daysSinceStart = Math.floor(
      (Date.now() - bwomStartDate) / (1000 * 60 * 60 * 24)
    );
    const reductions = Math.floor(daysSinceStart / 2);
    return Math.max(
      0,
      tokenDetails.bwom.rewardPercent - reductions * 0.46
    ).toFixed(2);
  };

  const updateDynamicBwomReward = () => {
    setRewardInfo({
      ...tokenDetails.bwom,
      rewardPercent: calculateDynamicRewardPercent(),
    });
  };

  const validateWalletAddress = (address) => address.length === 58;

  const fetchTokenPriceInAlgo = async (assetId) => {
    const response = await axios.get(
      `https://free-api.vestige.fi/asset/${assetId}/price?currency=algo`
    );
    return response.data.price;
  };

  const checkMinimumBalance = async () => {
    if (!validateWalletAddress(walletAddress)) {
      setFeedbackMessage("Invalid wallet address format.");
      return;
    }
    setFeedbackMessage("");
    setIsLoading(true);

    try {
      const { assetId, minAlgoValue, minBwomLPValue } =
        tokenDetails[selectedToken];
      const tokenPriceInAlgo =
        selectedToken === "tdld" ? await fetchTokenPriceInAlgo(assetId) : null;
      const requiredBalance =
        selectedToken === "tdld"
          ? Math.floor(minAlgoValue / tokenPriceInAlgo)
          : minBwomLPValue;

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
          `You qualify for reward in $${selectedToken.toUpperCase()}!`
        );
        setCurrentStep(2);
      } else {
        setEligibility(false);
        setFeedbackMessage(
          selectedToken === "tdld"
            ? `You need to hold at least ${requiredBalance} ${selectedToken.toUpperCase()} to qualify for the reward.`
            : `You need to hold at least ${requiredBalance} ${selectedToken.toUpperCase()}/ALGO LP tokens to qualify for the reward.`
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
        selectedToken,
      });
      setFeedbackMessage(response.data.message);
      setCurrentStep(response.data.success ? 3 : 1);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to claim the reward. Please try again.";
      setFeedbackMessage(errorMessage);
      console.error("Error claiming reward:", error);
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
        <TokenSelectionStep
          supportedTokens={supportedTokens}
          selectedToken={selectedToken}
          rewardInfo={rewardInfo}
          handleTokenSelect={handleTokenSelect}
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          checkMinimumBalance={checkMinimumBalance}
          isLoading={isLoading}
        />
      )}

      {currentStep === 2 && (
        <ClaimRewardStep
          handleClaimReward={handleClaimReward}
          eligible={eligible}
          isLoading={isLoading}
        />
      )}

      {currentStep === 3 && <RewardClaimedStep />}
    </div>
  );
};

export default RewardClaim;
