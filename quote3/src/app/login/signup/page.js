import styles from "@/styles/components/login_box.module.css";

export default function SignUp() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <form>
          <div className={styles.inputField}>
            <input type="text" placeholder="Username" />
          </div>
          <div className={styles.inputField}>
            <input type="password" placeholder="Password" />
          </div>
          <button className={styles.button}>Sign Up</button>
          <div className={styles.signUp}>
            <a href="/login">I have an account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
