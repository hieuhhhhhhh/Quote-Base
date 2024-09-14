"use client";

import { useState } from "react";
import styles from "@/styles/components/login_box.module.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Check if username is provided
    if (!username) {
      setResultMessage("Please enter a username.");
      return;
    }

    try {
      // Make a GET request to the API route
      const response = await fetch(
        `/api/validate_username?username=${encodeURIComponent(username)}`
      );
      const data = await response.json();

      if (response.ok) {
        if (data.exists) {
          setResultMessage("Username is already taken.");
        } else {
          setResultMessage("Username is available.");
          // Proceed with form submission or other logic
        }
      } else {
        setResultMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setResultMessage(`Error: ${error.message}`);
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
};

export default SignUp;
