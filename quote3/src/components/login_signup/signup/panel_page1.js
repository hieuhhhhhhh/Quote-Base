import { useState } from "react";
import styles from "../login_signup.module.css";
import submit from "@/lib/api/submit_signup";

const Page1 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const handleSubmit = async (event) => {
    submit(event, username, password, setResultMessage);
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
      <button type="submit" className={styles.button}>
        Continue
      </button>
      {resultMessage && <p>{resultMessage}</p>}
    </form>
  );
};

export default Page1;
