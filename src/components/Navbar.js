import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import NavBarStyles from "./css_modules/NavBarStyles.module.css";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // Function to close menu on item click
  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className={NavBarStyles.navBar}>
      <div className={NavBarStyles.hamburger} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul
        className={`${NavBarStyles.navList} ${
          showMenu ? NavBarStyles.open : ""
        }`}
      >
        <li className={NavBarStyles.navItem}>
          <NavLink
            to="/"
            onClick={closeMenu} // Closes the menu on click
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
            onClick={closeMenu} // Closes the menu on click
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
            onClick={closeMenu} // Closes the menu on click
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
            onClick={closeMenu} // Closes the menu on click
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
            onClick={closeMenu} // Closes the menu on click
            className={({ isActive }) =>
              isActive ? NavBarStyles.activeLink : ""
            }
          >
            Leaderboard
          </NavLink>
        </li>
        <li className={NavBarStyles.navItem}>
          <NavLink
            to="/learn-pera-wallet"
            onClick={closeMenu} // Closes the menu on click
            className={({ isActive }) =>
              isActive ? NavBarStyles.activeLink : ""
            }
          >
            How to use Pera Wallet
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
