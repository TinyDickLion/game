import React from 'react';
import { Link } from 'react-router-dom';
import NavBarStyles from './css_modules/NavBarStyles.module.css';

const NavBar = () => {
  return (
    <nav className={NavBarStyles.navBar}>
      <ul className={NavBarStyles.navList}>
        <li className={NavBarStyles.navItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={NavBarStyles.navItem}>
          <Link to="/Crystal-Swap">Crystal Swap</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
