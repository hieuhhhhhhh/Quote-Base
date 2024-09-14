import { useState } from "react";
import styles from "../login_signup.module.css";
import submit from "@/lib/api/submit_signup";

const Page1 = () => {
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

    submit(username, password, setMessage, setSubmitOk);
    if (submitOk) {
      setConfirmPW("");
      setPassword("");
    }
    setUsername("");
  };

  return (
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
    </form>
  );
};

export default Page1;
