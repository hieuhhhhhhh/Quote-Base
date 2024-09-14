"use client";

import { useState } from "react";
import styles from "@/styles/components/login_box.module.css";
import validate from "@/lib/db/validate_username";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const usernameExists = await validate(username);

    if (usernameExists) {
      setResultMessage("Username already taken. Please choose another one.");
    } else {
      setResultMessage("Username is available.");
      // Here you can proceed with further sign-up steps
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputField}>
            <input type="password" placeholder="Password" />
          </div>
          <button type="submit" className={styles.button}>
            Continue
          </button>
          {resultMessage && <p>{resultMessage}</p>}
          <div className={styles.signUp}>
            <a href="/login">Return to Log In</a>
          </div>
        </form>
      </div>
    </div>
  );
}
