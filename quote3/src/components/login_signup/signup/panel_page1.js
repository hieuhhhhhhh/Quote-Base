import { useState, useEffect } from "react";
import styles from "../login_signup.module.css";
import submit from "@/lib/api/submit_signup";

const Page1 = ({ toNextPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState(""); // PW = password

  const [message, setMessage] = useState("");
  const [submitOk, setSubmitOk] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (username === "" || password === "" || confirmPW === "") {
      setMessage("Please fill in all fields before continuing.");
      return;
    }

    if (confirmPW !== password) {
      setConfirmPW("");
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    await submit(username, password, setMessage, setSubmitOk);
  };

  useEffect(() => {
    if (submitOk) {
      toNextPage();
    }
  }, [submitOk]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <div className={styles.inputField}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.inputField}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.inputField}>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPW}
          onChange={(e) => setConfirmPW(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.button}>
        Continue
      </button>
      {message && (
        <p className={submitOk ? null : styles.negativeMsg}>{message}</p>
      )}
      <div className={styles.signUp}>
        <a href="/login">Return to Log In</a>
      </div>
    </form>
  );
};

export default Page1;
