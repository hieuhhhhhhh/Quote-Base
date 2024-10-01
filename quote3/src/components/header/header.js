"use client";

// src/components/Header.js
import React from "react";
import styles from "./header.module.css";

import { useSelector } from "react-redux";

const Header = () => {
  const username = useSelector((state) => state.username.username); // Get username from redux store

  return (
    <div className={styles.header}>
      <h2>Quotes Base</h2>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/pages/about">About</a>
          </li>
          <li>
            {username.trim() != "" ? (
              <a href="/pages/profile" style={{ color: "blue" }}>
                @{username}
              </a>
            ) : (
              <a href="/pages/profile">Profile</a>
            )}
          </li>
          <li>
            {username.trim() != "" ? (
              <a href="/">Log Out</a>
            ) : (
              <a href="/pages/login">Log In</a>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
