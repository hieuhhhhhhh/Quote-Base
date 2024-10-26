import { useState } from "react";
import styles from "./comment.module.css";
import TextareaAutosize from "react-textarea-autosize";
import { useSelector } from "react-redux";
import SubmitComment from "./helpers/submit_one";

export default function CommentInput({ post_id, onAddComment }) {
  const [comment, setComment] = useState("");

  const myAvatar = useSelector((state) => state.myProfile.avatar);

  const onInputComment = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = async () => {
    try {
      await SubmitComment(comment, post_id);
      onAddComment(comment);
      setComment("");
    } catch (e) {
      console.error("Error (comment.js):", e.message);
    }
  };

  return (
    <div>
      <h2>____________________________________</h2>
      <span className={styles.inputBox}>
        <span
          className="avatarHolder"
          style={{ marginRight: "15px", marginTop: "1.5px" }}
        >
          <img src={myAvatar || "/default_pfp.webp"} className="avatar" />
        </span>
        <TextareaAutosize
          value={comment}
          onChange={onInputComment}
          className={styles.input}
          placeholder="Add a comment..."
        />
      </span>
      <div className={styles.submitButton}>
        {comment && <button onClick={onSubmit}>Comment</button>}
      </div>
    </div>
  );
}
