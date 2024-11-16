import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation
import styles from "../../login/login_signup.module.css";
import submitInfo from "../helpers/submit_additional";

import { useSelector, useDispatch } from "react-redux";

import fetchMyBasicInfo from "@/lib/front_end/user_info/my_basic_info";

const Page2 = ({ isSignUp, closeModal }) => {
  const [alias, setAlias] = useState(
    useSelector((state) => state.myProfile.name)
  );
  const [bio, setBio] = useState(useSelector((state) => state.myProfile.bio));

  const id = useSelector((state) => state.myProfile.id);

  const [msg, setMsg] = useState("");
  const [submitOk, setSubmitOk] = useState(false);

  const router = useRouter(); // For redirecting after sign up

  const dispatch = useDispatch(); // For redux

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setMsg("");

    await submitInfo(alias, bio, setMsg, setSubmitOk);
  };

  useEffect(() => {
    const handleSubmitSuccess = async () => {
      // Upon successful submit:
      if (submitOk) {
        console.log("(panel_page2.js): Fetching...");

        // 1: update global states using redux:
        await fetchMyBasicInfo(dispatch); // Await the fetching of basic info

        if (isSignUp) {
          // 2: Navigate to new page on successful sign up
          router.push(`/pages/profile/${id}`);
        } else {
          closeModal();
        }
      }
    };

    handleSubmitSuccess();
  }, [submitOk]);

  return (
    <form onSubmit={handleSubmit}>
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
        Save
      </button>
    </form>
  );
};

export default Page2;
