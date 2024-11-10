import React, { useState } from "react";
import styles from "./css_modules/GameDescription.module.css";

const GameDescription = () => {
  const [selectedToken, setSelectedToken] = useState("tdld");

  const tokenDetails = {
    tdld: {
      name: "$TDLD",
      requirements: [
        "Hold $TDLD in your wallet for at least 12 hours without any recent incoming transfers.",
        "Hold a minimum of 25 ALGO worth of $TDLD to earn daily rewards at 50% APY (0.13% per day).",
        "Holding 50 ALGO worth or more qualifies you for double rewards, boosting your $TDLD holdings.",
      ],
    },
  };

  const handleTokenChange = (e) => {
    setSelectedToken(e.target.value);
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.heading}>Token Rewards</h2>
        <p className={styles.text}>
          Choose a token to see its specific requirements and benefits. Each token offers unique rewards and eligibility criteria.
        </p>
        <div className={styles.dropdown}>
          <label htmlFor="tokenSelect" className={styles.label}>
            Select Token:{" "}
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
        <h2 className={styles.heading}>Eligibility</h2>
        <p className={styles.text}>
          To qualify, hold the required amount of tokens for 12 consecutive hours without incoming transfers. This helps ensure rewards go to stable token holders.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Compounding Rewards</h2>
        <p className={styles.text}>
          Rewards are calculated daily based on your balance, allowing your holdings to grow as you participate in games and engage with supported tokens.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Daily Claim Limit</h2>
        <p className={styles.text}>
          Each wallet can claim a reward once per day to encourage ongoing engagement.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Sustainable Rewards</h2>
        <p className={styles.text} style={{ fontWeight: "bold" }}>
          We aim to keep rewards sustainable, with structures that may adjust based on feedback, market conditions, and collaborating projects.
        </p>
      </section>
    </div>
  );
};

export default GameDescription;
