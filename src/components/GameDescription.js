import React, { useState } from "react";
import styles from "./css_modules/GameDescription.module.css";

const GameDescription = () => {
  const [selectedToken, setSelectedToken] = useState("tdld");

  const tokenDetails = {
    tdld: {
      name: "$TDLD",
      requirements: [
        "Hold $TDLD in your wallet address continuously for at least 12 hours with no recent incoming transfers.",
        "Maintain a minimum of 25 ALGO worth of $TDLD to qualify for daily rewards at a 50% APY, equating to approximately 0.13% per day.",
        "Holding 50 ALGO worth or more qualifies you for double rewards, allowing for accelerated growth of your $TDLD holdings.",
      ],
    },
    // Add other tokens as they are supported
  };

  const handleTokenChange = (e) => {
    setSelectedToken(e.target.value);
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.heading}>Token-Specific Rewards</h2>
        <p className={styles.text}>
          Select a token below to view its specific reward requirements and
          benefits. Each token has unique APY and holding requirements, along with specific eligibility criteria.
        </p>
        <div className={styles.dropdown}>
          <label htmlFor="tokenSelect" className={styles.label}>
            Choose Token:{" "}
          </label>
          <select
            id="tokenSelect"
            value={selectedToken}
            onChange={handleTokenChange}
            className={styles.selectBox}
          >
            {Object.keys(tokenDetails).map((tokenKey) => (
              <option key={tokenKey} value={tokenKey}>
                {tokenDetails[tokenKey].name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.tokenDetails}>
          <h3 className={styles.heading}>
            {tokenDetails[selectedToken].name} Rewards
          </h3>
          <ul className={styles.requirements}>
            {tokenDetails[selectedToken].requirements.map((req, index) => (
              <li key={index} className={styles.text}>
                {req}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Eligibility Requirement</h2>
        <p className={styles.text}>
          To qualify for a reward, your account must hold the required amount of the selected token for at least 12 consecutive hours without any recent incoming transfers during this period. This ensures that only accounts with stable holdings are eligible to claim rewards.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Compounding Rewards</h2>
        <p className={styles.text}>
          Earn compounding rewards as you hold tokens and play. Rewards are
          calculated daily based on your current balance, enabling your holdings
          to grow over time as you participate in our games and engage with
          supported tokens.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Daily Participation and Limits</h2>
        <p className={styles.text}>
          Each wallet address can claim a reward once per day, ensuring daily
          engagement and participation.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Flexibility for Future Adjustments</h2>
        <p className={styles.text} style={{ fontWeight: "bold" }}>
          We aim to support a sustainable reward ecosystem. Reward structures
          may be adjusted based on feedback, market conditions, and the
          preferences of collaborating projects to enhance long-term value and
          engagement.
        </p>
      </section>
    </div>
  );
};

export default GameDescription;
