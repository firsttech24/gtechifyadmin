/** @format */

import React from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>GLOBAL TECHIFY</div>
      <div className={styles.menu}>
        <Link to={"/portal"}>
          <span className={styles.menuItem}>Portal</span>
        </Link>
        <Link to={"/"}>
          <span className={styles.menuItem}>Mentors</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
