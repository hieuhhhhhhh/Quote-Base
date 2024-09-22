"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation
import styles from "../login_signup.module.css";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // For redirecting after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/protected"); // Redirect to protected page on successful login
    } else {
      setError("Invalid login credentials. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputField}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Log In
          </button>
          <div className={styles.signUp}>
            <a href="/login/signup">Create a new account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
