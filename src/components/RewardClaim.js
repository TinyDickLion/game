import React, { useState, useEffect, useCallback } from "react";

import { checkMinimumBalance } from "../business/checkMinimumBalance";
import {
  calculateDynamicBwomRewardPercent,
  calculateDynamicRearRewardPercent,
} from "../business/calculateDynamicRewardPercent";
import { claimReward } from "../business/claimReward";

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
    rear: { assetId: 1036120453, minTLPLPValue: 5, rewardPercent: 2 },
  };
  const bwomStartDate = new Date("2024-11-14");
  const rearStartDate = new Date("2024-11-22");

  // Set supported tokens and default reward info on mount
  useEffect(() => {
    setSupportedTokens(Object.keys(tokenDetails));
    setRewardInfo(tokenDetails["tdld"]);
  }, []);

  // Update reward info for BWOM token dynamically
  useEffect(() => {
    if (selectedToken === "bwom") {
      updateDynamicBwomReward();
    } else if (selectedToken === "rear") {
      updateDynamicRearReward();
    } else {
      setRewardInfo(tokenDetails[selectedToken]);
    }
  }, [selectedToken]);

  // Check minimum balance if scoreCheck or walletAddress changes
  useCallback(() => {
    const timeout = setTimeout(() => {
      if (scoreCheck && walletAddress) {
        handleCheckMinimumBalance();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [scoreCheck, walletAddress]);

  const updateDynamicBwomReward = () => {
    setRewardInfo({
      ...tokenDetails.bwom,
      rewardPercent: calculateDynamicBwomRewardPercent(
        bwomStartDate,
        tokenDetails
      ),
    });
  };

  const updateDynamicRearReward = () => {
    setRewardInfo({
      ...tokenDetails.rear,
      rewardPercent: calculateDynamicRearRewardPercent(
        rearStartDate,
        tokenDetails
      ),
    });
  };

  const handleCheckMinimumBalance = () => {
    checkMinimumBalance({
      walletAddress,
      selectedToken,
      tokenDetails,
      setEligibility,
      setFeedbackMessage,
      setCurrentStep,
      setIsLoading,
    });
  };

  const handleClaimReward = async () => {
    await claimReward({
      API_BASE_URL,
      walletAddress,
      selectedToken,
      setFeedbackMessage,
      setEligibility,
      setIsLoading,
      setCurrentStep,
    });
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
          checkMinimumBalance={handleCheckMinimumBalance}
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
