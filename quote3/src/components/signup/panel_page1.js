import { useState } from "react";
import styles from "@/styles/components/login_box.module.css";
import validate from "@/lib/api/validate_username";

const Page1 = () => {
  const [username, setUsername] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const handleSubmit = async (event) => {
    validate(event, username, setResultMessage);
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
        <input type="password" placeholder="Password" />
      </div>
      <button type="submit" className={styles.button}>
        Continue
      </button>
      {resultMessage && <p>{resultMessage}</p>}
    </form>
  );
};

export default Page1;
