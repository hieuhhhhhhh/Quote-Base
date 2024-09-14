"use client";

import styles from "../login_signup.module.css";
import Page1 from "./panel_page1";

const SignUpPanel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Sign Up</h2>
        <Page1 />
        <div className={styles.signUp}>
          <a href="/login">Return to Log In</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPanel;
