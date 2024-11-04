import React from "react";
import styles from "./css_modules/WhitePaper.module.css";

const WhitePaper = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay}></div>{" "}
      {/* White overlay background */}
      <div className={styles.contentWrapper}>
        <br></br>
        <br></br>
        <header className={styles.header}>
          <h1>Tiny Dick Lions' Den ($TDLD) White Paper</h1>
          <h2>Version 0.1</h2>
        </header>

        {/* <aside className={styles.tableOfContents}>
            <h3>Table of Contents</h3>
            <ul>
              {sections.map((section, index) => (
                <li key={index}><a href={`#${section.id}`}>{section.title}</a></li>
              ))}
            </ul>
          </aside> */}

        <div className={styles.content}>
          {sections.map((section, index) => (
            <section key={index} id={section.id} className={styles.section}>
              <h2 className={styles.heading}>{section.title}</h2>
              <p className={styles.text}>{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    text: "Tiny Dick Lions' Den ($TDLD) is a project that aims to foster a positive environment centered on inclusivity, anti-bullying, and community support. Through engaging games, a unique reward system, and a community-focused mission, $TDLD aims to empower users while promoting social awareness.",
  },
  {
    id: "problem-statement",
    title: "Problem Statement",
    text: "In the current crypto space, many communities lack genuine missions that resonate with people's real-life values. Additionally, while gamification has become popular, few projects use it to bring social causes and community-building to the forefront. Our project aims to solve this by combining financial incentives with a cause-driven ecosystem that encourages positive behavior and inclusivity.",
  },
  {
    id: "project-overview",
    title: "Project Overview",
    text: "$TDLD offers a platform for community engagement through play-to-earn games, rewarding users with tokens for active participation and various motivational quotes through our social page. By promoting values of respect and anti-bullying, $TDLD offers a space where players can enjoy games while supporting a cause. Our vision is to create a long-term, evolving project that grows alongside its community, adapting to new needs and ideas as they arise.",
  },
  {
    id: "tokenomics",
    title: "$TDLD Tokenomics",
    text: "The $TDLD token is an ASA (Algorand Standard Asset) created on the Algorand blockchain. The token was generated on the RugNinja platform with an initial supply designed to support a sustainable rewards ecosystem. \n\nToken Symbol: $TDLD \nToken ID: 2176744157 \nTotal Supply: 150 Billion",
  },
  {
    id: "reward-structures",
    title: "Reward Structures",
    text: "To participate in the reward system, holders must maintain a minimum balance of $TDLD equivalent to 25 ALGO in value. This requirement ensures an ongoing commitment to the community while maintaining the token’s value. Holders with $TDLD equivalent to 50 ALGO or more qualify for double rewards, incentivizing larger holdings.",
  },
  {
    id: "ecosystem-growth-strategy",
    title: "Ecosystem Growth Strategy",
    text: "$TDLD’s growth will be driven by: Collaborations with other token projects, Games and Challenges, and other features to keep users engaged and promote token stability.",
  },
  {
    id: "community-engagement",
    title: "Community Engagement and Anti-Bullying Initiative",
    text: "$TDLD is more than just a token—it's a movement. By promoting values of respect, inclusivity, and anti-bullying, we aim to create a supportive and uplifting community. Our games encourage positive interaction, and the reward system provides an additional incentive for players to champion these values.",
  },
  {
    id: "security-compliance",
    title: "Security and Compliance",
    text: "The $TDLD token is built on the Algorand blockchain, which offers strong security and low transaction costs. We will adhere to regulatory requirements to ensure $TDLD remains compliant and accessible to a broad audience.",
  },
  {
    id: "conclusion",
    title: "Conclusion",
    text: "Tiny Dick Lions' Den ($TDLD) is a unique blend of gamification, rewards, and social purpose. We believe that financial success and social good can coexist, and our goal is to grow $TDLD into a sustainable and positive community within the crypto space.",
  },
  {
    id: "contact",
    title: "Contact",
    text: "For inquiries, collaborations, and more, reach us at: tinydicklionsden@gmail.com",
  },
];

export default WhitePaper;
