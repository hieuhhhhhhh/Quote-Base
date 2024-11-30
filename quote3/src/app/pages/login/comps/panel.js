"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation
import styles from "../login_signup.module.css";
import submit from "@/lib/front_end/submit_login";
import Link from "next/link";

import { useDispatch } from "react-redux";
import fetchMyBasicInfo from "@/lib/front_end/user_info/my_basic_info";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [submitOk, setSubmitOk] = useState(false);

  const router = useRouter(); // For redirecting after login

  const dispatch = useDispatch(); // For redux

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    await submit(username, password, setMsg, setSubmitOk);
  };

  useEffect(() => {
    const handleSubmitSuccess = async () => {
      // Upon successful submit:
      if (submitOk) {
        console.log("(panel.js): Fetching...");

        // 1: update global states using redux:
        await fetchMyBasicInfo(dispatch); // Await the fetching of basic info

        // 2: Navigate to new page on successful login
        router.push("/");
      }
    };

    handleSubmitSuccess();
  }, [submitOk]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <form onSubmit={handleSubmit}>
          <h2>Log In</h2>
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
            <Link href="/pages/signup">Create a new account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
