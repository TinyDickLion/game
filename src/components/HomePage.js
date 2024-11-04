import React from "react";
import { Link } from "react-router-dom";
import HomePageStyles from "./css_modules/HomePageStyles.module.css";

const HomePage = () => {
  return (
    <div className={HomePageStyles.container}>
      {/* Background Gradient */}
      <div className={HomePageStyles.animatedBackground}></div>
      
      {/* Welcome Text and Start Button */}
      <div className={`${HomePageStyles.content} ${HomePageStyles.floating}`}>
        <h1 className={HomePageStyles.title}>
          Welcome to Tiny Dick Lion's Den Games!
        </h1>
        <p className={HomePageStyles.description}>
          Embark on an exciting journey to earn rewards and reach high scores. Are you ready?
        </p>
        <div className={HomePageStyles.buttonContainer}>
          <Link to="/match-3-mania" className={HomePageStyles.button}>
            Start
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
