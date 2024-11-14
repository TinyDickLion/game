import React from "react";
import RestartGameStyles from "./css_modules/RestartGameStyles.module.css";

const ClaimRewardStep = ({ handleClaimReward, eligible, isLoading }) => (
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
);

export default ClaimRewardStep;
