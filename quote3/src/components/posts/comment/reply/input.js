import { useState } from "react";
import styles from "../comment.module.css";
import TextareaAutosize from "react-textarea-autosize";
import { useSelector } from "react-redux";
import SubmitReply from "../helpers/submit_reply";
import AvatarLink from "@/components/wrappers/profile_link/avatar_link";

export default function ReplyInput({ parent_id, onAddReply, onClose }) {
  const [comment, setComment] = useState("");

  const myAvatar = useSelector((state) => state.myProfile.avatar);
  const myId = useSelector((state) => state.myProfile.id);

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
        <AvatarLink user_id={myId}>
          <div className="smallAvatarHolder">
            <img src={myAvatar || "/default_pfp.webp"} className="avatar" />
          </div>
        </AvatarLink>
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
