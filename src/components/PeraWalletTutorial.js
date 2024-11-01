// PeraWalletTutorial.js
import React from 'react';
import styles from './css_modules/PeraWalletTutorial.module.css';

const episodes = [
    {
        title: "Episode 1: Introduction to Pera Wallet",
        videoId: "Adbn-1jqKNM", // Example YouTube video ID; replace with actual
        description: "An introduction to Pera Wallet",
    },
    {
        title: "Episode 2: Setting up your Pera Wallet",
        videoId: "m720vHR8g1U",
        description: "Learn how to set up your very own Pera Wallet",
    },
    {
        title: "Episode 3: Navigating The Pera Wallet App",
        videoId: "6Q4rwjhPjI8",
        description: "Dive into navigating the Pera Wallet app",
    },
    {
        title: "Episode 4: Transferring Algo into Pera Wallet",
        videoId: "kwcu_DDh6kU",
        description: "how to fund your Pera Wallet by transferring Algos from an exchange like Coinbase.",
    },
    {
        title: "Episode 5: Transactions",
        videoId: "TPUC1UJ7rA4",
        description: "Learn how to send and receive tokens using your Pera Wallet, along with tips for transacting safely",
    },
    {
        title: "Episode 6: NFTs in Pera Wallet",
        videoId: "3yGnYoZWFeE",
        description: "Connect your Pera Wallet with decentralized apps and learn how to opt into NFTs, and navigate platforms",
    },
    {
        title: "Episode 7: Swapping Tokens Within Pera Wallet",
        videoId: "CdizcOZX6bE",
        description: "How to initiate a swap, the benefits of using Vestige as an aggregator for the best rates 💱, and how Pera Wallet ensures security throughout the process ",
    },
    {
        title: "Episode 8: Explorer & Discover with Pera Wallet",
        videoId: "hhCg4Z5TNVY",
        description: "Dive into the Discover and Explorer sections of the Pera Wallet app ",
    },
    {
        title: "Episode 9: Rekeying with Pera Wallet",
        videoId: "kh1NRFJvlw4",
        description: "Dive into the 🔑 rekeying feature in Pera Wallet! Rekeying lets you change the private key linked to your account without moving your assets",
    },
    {
        title: "Episode 10: Managing your Accounts",
        videoId: "h1Q0C9r4BiQ",
        description: "Managing multiple accounts within your Pera Wallet.",
    }
];

const PeraWalletTutorial = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Learn Pera Wallet: 10-Part Video Series</h1>
            <p className={styles.subtitle}>Master your Pera Wallet with our step-by-step tutorial series.</p>
            <div className={styles.episodes}>
                {episodes.map((episode, index) => (
                    <div key={index} className={styles.episode}>
                        <h2 className={styles.episodeTitle}>{episode.title}</h2>
                        <p className={styles.description}>{episode.description}</p>
                        <div className={styles.videoWrapper}>
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${episode.videoId}`}
                                title={episode.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PeraWalletTutorial;
