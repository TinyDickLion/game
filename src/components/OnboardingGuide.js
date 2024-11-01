// OnboardingGuide.js
import React from "react";
import styles from "./css_modules/OnboardingGuide.module.css";

const OnboardingGuide = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Getting Started with Algorand</h1>
      <div className={styles.section}>
        <h2 className={styles.heading}>Step 1: Download Pera Wallet</h2>
        <p className={styles.text}>
          To start using Algorand, you’ll need a wallet to hold your assets. We
          recommend
          <strong> Pera Wallet</strong> as it’s user-friendly and secure.
          Download it from the App Store or Google Play by searching for "Pera
          Wallet."
        </p>
        <div className={styles.links}>
          <a
            href="https://apps.apple.com/us/app/pera-algo-wallet/id1459898525"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Download on App Store
          </a>
          <a
            href="https://play.google.com/store/search?q=pera+wallet&c=apps"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Download on Google Play
          </a>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Step 2: Set Up Your Wallet</h2>
        <p className={styles.text}>
          After downloading, open the Pera Wallet app. Follow the on-screen
          instructions to create a new wallet. Be sure to save your recovery
          phrase in a secure location. This phrase is essential for accessing
          your wallet if you lose your device.
        </p>
        <div className={styles.links}>
          <a
            href="https://support.perawallet.app/en/article/create-a-new-algorand-account-on-pera-wallet-1ehbj11/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Check out Pera Wallet support for creating a new Wallet
          </a>
          <a
            href="https://support.perawallet.app/en/article/backing-up-your-recovery-passphrase-uacy9k/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Check out Pera Wallet support for saving your recovery phrase
          </a>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>
          Step 3: Explore the Algorand Ecosystem
        </h2>
        <p className={styles.text}>
          Now you’re ready to explore Algorand dApps, games, and more! Use your
          Pera Wallet to connect with various platforms, including our game.
          Simply look for the "Connect Wallet" button on supported sites to
          start interacting with Algorand.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Need Help?</h2>
        <p className={styles.text}>
          If you have questions, check out the official
          <a
            style={{ padding: "0.25em" }}
            href="https://support.perawallet.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Pera Wallet Support
          </a>
          or the
          <a
            style={{ padding: "0.25em" }}
            href="https://algorand.foundation/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Algorand Foundation
          </a>
          for resources on getting started.
        </p>
      </div>
    </div>
  );
};

export default OnboardingGuide;
