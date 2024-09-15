import { useState, useEffect } from "react";

import styles from "../login_signup.module.css";

const Page2 = () => {
  const [alias, setAlias] = useState("");
  const [bio, setBio] = useState("");

  return (
    <form>
      <h2>Tell us about yourself</h2>

      <div className={styles.inputField}>
        <p className={styles.label}>
          Would you like a different name displayed on your profile? (optional)
        </p>
        <textarea
          className={styles.textarea}
          rows="1"
          type="text"
          placeholder="Add an alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
      </div>

      <div className={styles.inputField}>
        <p className={styles.label}>Add a biography (optional)</p>
        <textarea
          className={styles.textarea}
          type="text"
          rows="4"
          placeholder="Tell people who you are"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.button}>
        Continue
      </button>
    </form>
  );
};

export default Page2;
