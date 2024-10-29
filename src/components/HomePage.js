import React from 'react';
import { Link } from 'react-router-dom';
import HomePageStyles from './css_modules/HomePageStyles.module.css';

const HomePage = () => {
  return (
    <div className={HomePageStyles.container}>
      <h1 className={HomePageStyles.title}>Welcome to Tiny Dick Lion's Den Games!</h1>
      <p className={HomePageStyles.description}>
        Embark on an exciting journey to earn rewards by matching Crystals and reaching high scores. Are you ready?
      </p>
      <div className={HomePageStyles.buttonContainer}>
        <Link to="/match-3-mania" className={HomePageStyles.button}>
          Start
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
