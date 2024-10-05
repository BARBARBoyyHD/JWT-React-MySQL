import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navBar.module.css'; // Make sure the path is correct

const NavBar = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>JWT React MySQL</h1>
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link className={styles.navLink} to="/">Home</Link></li>
            <li className={styles.navItem}><Link className={styles.navLink} to="/about">About</Link></li>
            <li className={styles.navItem}><Link className={styles.navLink} to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
