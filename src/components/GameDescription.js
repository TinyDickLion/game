import React from "react";
import styles from "./css_modules/GameDescription.module.css";

const GameDescription = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.heading}>Welcome to $TDLD Rewards</h2>
        <p className={styles.text}>
          Compete in fun, engaging games and win $TDLD rewards! The more you
          play, the more you earn — with opportunities to increase your holdings
          and unlock special bonuses. Check out the details below on how you can
          maximize your earnings while enjoying the games!
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>$TDLD Economy</h2>
        <p className={styles.text}>
          To participate in the reward system, you must hold a minimum amount of
          $TDLD tokens equivalent to 25 ALGO in value. Rewards are calculated
          daily, based on an APY of 50%, meaning you can earn a daily reward of
          approximately 0.13% on your $TDLD holdings.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Compounding Effect</h2>
        <p className={styles.text}>
          As you hold $TDLD, your rewards grow over time. Each day, the 0.13%
          reward is calculated based on your current balance, which includes any
          rewards you've already earned. This compounding effect means that your
          daily rewards gradually increase, simply by holding onto your $TDLD
          tokens. The longer you hold, the more your rewards can grow!
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Double Rewards</h2>
        <p className={styles.text}>
          If you hold $TDLD tokens equivalent to 50 ALGO or more, you qualify
          for double rewards on that day! This unique bonus structure allows
          players to maximize their rewards and increase their $TDLD holdings
          faster.
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
        <h2 className={styles.heading}>Daily Reward Limit</h2>
        <p className={styles.text}>
          Feel free to play as many games as you'd like throughout the day!
          However, please note that each wallet address can only claim one
          reward per day, even if you win in multiple games. Choose your best
          performance to claim your reward, and come back tomorrow to compete
          again!
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

      <section className={styles.section}>
        <h2 className={styles.heading}>Reward Structure Adjustments</h2>
        <p className={styles.text} style={{ fontWeight: "bold" }}>
          Please note that the reward structure may change at our discretion in
          response to market conditions and community growth. Our goal is to
          maintain a sustainable and engaging ecosystem for $TDLD holders, and
          we’ll make adjustments as needed to ensure long-term value.
        </p>
      </section>
    </div>
  );
};

export default GameDescription;
