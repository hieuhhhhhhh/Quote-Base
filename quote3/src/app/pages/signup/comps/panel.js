"use client";

import { useState } from "react";
import styles from "../../login/login_signup.module.css";
import Page1 from "./panel_page1";
import Page2 from "./panel_page2";

const SignUpPanel = () => {
  const [page, setPage] = useState(1);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {page === 1 && <Page1 toNextPage={() => setPage(2)} />}
        {page === 2 && <Page2 isSignUp={true} />}
      </div>
    </div>
  );
};

export default SignUpPanel;
