import React from "react";
import RestartGameStyles from "./css_modules/RestartGameStyles.module.css";

const RewardClaimedStep = () => (
  <div className={RestartGameStyles.stepContainer}>
    <h2 className={RestartGameStyles.stepTitle}>Reward Claimed!</h2>
    <p className={RestartGameStyles.instructions}>
      Check your wallet for the reward. Thank you for participating!
    </p>
  </div>
);

export default RewardClaimedStep;
