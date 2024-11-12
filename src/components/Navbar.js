import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import NavBarStyles from "./css_modules/NavBarStyles.module.css";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  // Effect to handle screen resizing and reset the menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMenu(false); // Close menu and reset icon on large screens
      }
    };

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={NavBarStyles.navBar}>
      <div
        className={`${NavBarStyles.hamburger} ${
          showMenu ? NavBarStyles.open : ""
        }`}
        onClick={toggleMenu}
      >
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
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? NavBarStyles.activeLink : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li className={NavBarStyles.navItem}>
          <a
            href="https://vestige.fi/asset/2176744157"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Get $TDLD
          </a>
        </li>
        <li className={NavBarStyles.navItem}>
          <NavLink
            to="/rewards-game-guide"
            onClick={closeMenu}
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
            onClick={closeMenu}
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
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? NavBarStyles.activeLink : ""
            }
          >
            Trivia Takedown
          </NavLink>
        </li>
        <li className={NavBarStyles.navItem}>
          <NavLink
            to="/duel-arena"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? NavBarStyles.activeLink : ""
            }
          >
            Duel Arena
          </NavLink>
        </li>
        {/* <li className={NavBarStyles.navItem}>
          <NavLink
            to="/leaderboard"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? NavBarStyles.activeLink : ""
            }
          >
            Leaderboard
          </NavLink>
        </li> */}
        <li className={NavBarStyles.navItem}>
          <NavLink
            to="/learn-pera-wallet"
            onClick={closeMenu}
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
