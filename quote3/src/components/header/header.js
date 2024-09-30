"use client";

// src/components/Header.js
import React from "react";
import styles from "./header.module.css";

import { useSelector, useDispatch } from "react-redux";
import { usernameInput } from "../redux/action";

const Header = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username.username); // Get username from redux store

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent the default link behaviour
    dispatch(usernameInput("")); // Clear username from redux store
  }

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
            <a href="/pages/profile">Profile</a>
          </li>
          <li>
            {username.trim() != "" ? (
              <a href="/pages/login" onClick={handleLogout}>Log Out</a>
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
