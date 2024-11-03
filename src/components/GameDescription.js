import React from "react";
import styles from "./css_modules/GameDescription.module.css";

const GameDescription = () => {
  return (
    <div className={styles.container}>
{/* 
      <section className={styles.section}>
        <h2 className={styles.heading}>How to Play</h2>
        <p className={styles.text}>
          Swap adjacent elements to match three or more of the same color in a
          row or column. Matched elements disappear, making way for new ones to
          fall into place, creating more opportunities for you to earn points.
          Rack up 100 points to claim your rewards and start winning in the
          world of $TDLD!
        </p>
      </section> */}

      <section className={styles.section}>
        <h2 className={styles.heading}>$TDLD Economy</h2>
        <p className={styles.text}>
          To participate in the reward system, you must hold a minimum amount of
          $TDLD tokens equivalent to 25 ALGO in value. Rewards are calculated
          daily, based on an APY of 50%, which means you can earn a daily reward
          of approximately 0.13% on your $TDLD holdings.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Double Rewards</h2>
        <p className={styles.text}>
          If you hold $TDLD tokens equivalent to 50 ALGO or more, you qualify
          for double rewards on that day! This unique bonus structure allows
          players to maximize their rewards and increase their $TDLD holdings.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Daily Participation</h2>
        <p className={styles.text}>
          Remember, each wallet address can only claim a reward once per day.
          So, come back every day to play, earn points, and claim your rewards.
          Keep track of your $TDLD holdings to maximize your earnings!
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Future Rewards</h2>
        <p className={styles.text}>
          Coming soon: We’ll be introducing weekly, monthly, and yearly rewards
          for those who hold specific amounts of $TDLD over time. By maintaining
          your holdings, you'll unlock even greater rewards, giving you more
          reasons to stay engaged and earn with $TDLD!
        </p>
      </section>
      
    </div>
  );
};

export default GameDescription;
