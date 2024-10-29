import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBarStyles from './css_modules/NavBarStyles.module.css';

const NavBar= () => {
  return (
    <nav className={NavBarStyles.navBar}>
      <ul className={NavBarStyles.navList}>
        <li className={NavBarStyles.navItem}>
          <NavLink to="/" className={({ isActive }) => isActive ? NavBarStyles.activeLink : ''}>
            Home
          </NavLink>
        </li>
        <li className={NavBarStyles.navItem}>
          <NavLink to="/crystal-swap" className={({ isActive }) => isActive ? NavBarStyles.activeLink : ''}>
          Crystal Swap
          </NavLink>
        </li>
        <li className={NavBarStyles.navItem}>
          <NavLink to="/leaderboard" className={({ isActive }) => isActive ? NavBarStyles.activeLink : ''}>
            Leaderboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;