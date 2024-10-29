import { useState } from "react";
import styles from "../comment.module.css";
import TextareaAutosize from "react-textarea-autosize";
import { useSelector } from "react-redux";
import SubmitReply from "../helpers/submit_reply";

export default function ReplyInput({ parent_id, onAddReply, onClose }) {
  const [comment, setComment] = useState("");

  const myAvatar = useSelector((state) => state.myProfile.avatar);

  const onInput = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = async () => {
    try {
      const added = await SubmitReply(comment, parent_id);
      onAddReply(added);
      setComment("");
    } catch (e) {
      console.error("Error (reply/input.js):", e.message);
    }
  };

  return (
    <div>
      <span className={styles.inputBox}>
        <span className="smallAvatarHolder">
          <img src={myAvatar || "/default_pfp.webp"} className="avatar" />
        </span>
        <TextareaAutosize
          value={comment}
          onChange={onInput}
          className={styles.input}
          style={{ padding: "6px" }}
          placeholder="Replying..."
        />
      </span>
      <div className={styles.submitButton}>
        <button onClick={onClose}>Cancel</button>
        {comment && <button onClick={onSubmit}>Reply</button>}
      </div>
    </div>
  );
}
