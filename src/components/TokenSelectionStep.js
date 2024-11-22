import React from "react";
import RestartGameStyles from "./css_modules/RestartGameStyles.module.css";

const TokenSelectionStep = ({
  supportedTokens,
  selectedToken,
  rewardInfo,
  handleTokenSelect,
  walletAddress,
  setWalletAddress,
  checkMinimumBalance,
  isLoading,
}) => (
  <div className={RestartGameStyles.stepContainer}>
    <h2 className={RestartGameStyles.stepTitle}>Select a Supported Token</h2>
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
        {rewardInfo.minAlgoValue ? (
          <>
            For holding {rewardInfo.minAlgoValue} ALGO worth of $
            {selectedToken.toUpperCase()}, you can claim{" "}
            {rewardInfo.rewardPercent}% in ${selectedToken.toUpperCase()}.
          </>
        ) : rewardInfo.minBwomLPValue ? (
          <>
            For holding {rewardInfo.minBwomLPValue} $BWOM/ALGO Tinyman LP
            Tokens, you can claim {rewardInfo.rewardPercent}% in $
            {selectedToken.toUpperCase()}.
          </>
        ) : (
          <>
            For holding {rewardInfo.minTLPLPValue} $TLP/ALGO Tinyman LP Tokens,
            you can claim {rewardInfo.rewardPercent}% in $
            {selectedToken.toUpperCase()}.
          </>
        )}
      </p>
    )}
    <input
      type="text"
      placeholder="Enter your wallet address"
      value={walletAddress}
      onChange={(e) => setWalletAddress(e.target.value)}
      className={RestartGameStyles.walletInput}
    />
    <button
      onClick={checkMinimumBalance}
      className={RestartGameStyles.checkButton}
      disabled={isLoading}
    >
      {isLoading ? "Checking..." : "Check Eligibility"}
    </button>
  </div>
);

export default TokenSelectionStep;
