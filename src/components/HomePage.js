import React from "react";
import { Link } from "react-router-dom";
import HomePageStyles from "./css_modules/HomePageStyles.module.css";

const HomePage = () => {
  return (
    <div className={HomePageStyles.container}>
      {/* Welcome Text and Start Button */}
      <div
        style={{
          backgroundColor: "antiquewhite",
          padding: "1em",
          opacity: "0.8",
        }}
        className={HomePageStyles.content}
      >
        <h1 className={HomePageStyles.title}>
          Welcome to Tiny Dick Lion's Den Games!
        </h1>
        <br></br>
        <p className={HomePageStyles.description}>
          Embark on an exciting journey to earn rewards and reaching high
          scores. Are you ready?
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
