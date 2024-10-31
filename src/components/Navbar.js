import React from "react";
import { NavLink } from "react-router-dom";
import NavBarStyles from "./css_modules/NavBarStyles.module.css";

const NavBar = () => {
  return (
    <nav className={NavBarStyles.navBar}>
      <ul className={NavBarStyles.navList}>
        <li className={NavBarStyles.navItem}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? NavBarStyles.activeLink : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li className={NavBarStyles.navItem}>
          <NavLink
            to="/rewards-game-guide"
            className={({ isActive }) =>
              isActive ? NavBarStyles.activeLink : ""
            }
          >
            Rewards & Game Guide
          </NavLink>
        </li>
        <li className={NavBarStyles.navItem}>
          <NavLink
            to="/match-3-mania"
            className={({ isActive }) =>
              isActive ? NavBarStyles.activeLink : ""
            }
          >
            Match 3 Mania
          </NavLink>
        </li>
        <li className={NavBarStyles.navItem}>
          <NavLink
            to="/trivia-takedown"
            className={({ isActive }) =>
              isActive ? NavBarStyles.activeLink : ""
            }
          >
            Trivia Takedown
          </NavLink>
        </li>
        <li className={NavBarStyles.navItem}>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              isActive ? NavBarStyles.activeLink : ""
            }
          >
            Leaderboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
