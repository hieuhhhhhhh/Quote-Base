"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation
import styles from "../login_signup.module.css";
import submit from "@/lib/api/submit_login";

import { useDispatch } from "react-redux";
import { usernameInput } from "@/components/redux/action";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [submitOk, setSubmitOk] = useState(false);

  const router = useRouter(); // For redirecting after login

  const dispatch = useDispatch(); // For storing the username in Redux store

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    //dispatch(usernameInput(username)); // Test for storing the username using redux
    await submit(username, password, setMsg, setSubmitOk);
  };

  useEffect(() => {
    if (submitOk) {
      dispatch(usernameInput(username));
      router.push("/pages/profile"); // Redirect to protected page on successful login
    }
  }, [submitOk, username]);

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
          {msg && <p className={submitOk ? null : styles.negativeMsg}>{msg}</p>}
          <button type="submit" className={styles.button}>
            Log In
          </button>
          <div className={styles.signUp}>
            <a href="/pages/signup">Create a new account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
