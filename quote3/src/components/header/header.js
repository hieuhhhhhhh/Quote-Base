// src/components/Header.js
import React from "react";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h2>Quotes Base</h2>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/login">Log In</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
