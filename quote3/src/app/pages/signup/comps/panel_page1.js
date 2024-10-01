import { useState, useEffect } from "react";
import styles from "../../login/login_signup.module.css";
import submit from "@/lib/front_end/submit_signup";

import { useDispatch } from "react-redux"; // npm install redux react-redux
import { usernameInput } from "@/components/redux/action";

const Page1 = ({ toNextPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState(""); // PW = password

  const [message, setMsg] = useState("");
  const [submitOk, setSubmitOk] = useState(false);

  const dispatch = useDispatch(); // For storing the username in Redux store

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setMsg("");

    if (confirmPW !== password) {
      setConfirmPW("");
      setMsg("Passwords do not match. Please try again.");
      return;
    }

    await submit(username, password, setMsg, setSubmitOk);
  };

  useEffect(() => {
    if (submitOk) {
      dispatch(usernameInput(username));
      setUsername("");
      setPassword("");
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

      <div className={styles.inputField}>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPW}
          onChange={(e) => setConfirmPW(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        Continue
      </button>
      {message && (
        <p className={submitOk ? null : styles.negativeMsg}>{message}</p>
      )}
      <div className={styles.signUp}>
        <a href="/pages/login">Return to Log In</a>
      </div>
    </form>
  );
};

export default Page1;
