import { useState } from "react";
import styles from "../login_signup.module.css";
import submit from "@/lib/api/submit_signup";

const Page1 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resMsg, setResMsg] = useState("");
  const [submitOk, setSubmitOk] = useState(false);

  const handleSubmit = async (event) => {
    submit(event, username, password, setResMsg, setSubmitOk);
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
      {resMsg && !submitOk && <p className={styles.negativeMsg}>{resMsg}</p>}
    </form>
  );
};

export default Page1;
