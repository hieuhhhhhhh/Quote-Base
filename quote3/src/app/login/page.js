import styles from "@/styles/components/login_box.module.css";

export default function LogIn() {
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
          <button className={styles.button}>Log In</button>
          <div className={styles.signUp}>
            <a href="#">Create a new account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
