// src/components/Header.js
import React from "react";
import styles from "./styles/header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Quotes Base</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/login">Log In</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
