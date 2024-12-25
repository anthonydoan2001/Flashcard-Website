import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navLogo}>
          Flashcard App
        </Link>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/add-folder" className={styles.navLink}>
            Add Folder
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
