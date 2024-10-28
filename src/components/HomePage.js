import React from 'react';
import { Link } from 'react-router-dom';
import HomePageStyles from './css_modules/HomePageStyles.module.css';

const HomePage = () => {
  return (
    <div className={HomePageStyles.container}>
      <h1 className={HomePageStyles.title}>Welcome to Jewel Rush!</h1>
      <p className={HomePageStyles.description}>
        Embark on an exciting journey to earn rewards by matching jewels and reaching high scores. Are you ready?
      </p>
      <div className={HomePageStyles.buttonContainer}>
        <Link to="/jewel-rush" className={HomePageStyles.button}>
          Start Jewel Rush
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
