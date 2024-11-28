import { useState } from "react";
import styles from "./comment.module.css";
import TextareaAutosize from "react-textarea-autosize";
import { useSelector } from "react-redux";
import SubmitComment from "./helpers/submit_comment";
import AvatarLink from "@/components/wrappers/profile_link/avatar_link";

export default function CommentInput({ post_id, onAddComment }) {
  const [comment, setComment] = useState("");

  const myAvatar = useSelector((state) => state.myProfile.avatar);
  const myId = useSelector((state) => state.myProfile.id);

  const onInputComment = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = async () => {
    try {
      const added = await SubmitComment(comment, post_id);
      onAddComment(added);
      setComment("");
    } catch (e) {
      console.error("Error (comment.js):", e.message);
    }
  };

  return (
    <div>
      <span className={styles.inputBox}>
        <AvatarLink user_id={myId}>
          <div className="avatarHolder">
            <img src={myAvatar || "/default_pfp.webp"} className="avatar" />
          </div>
        </AvatarLink>

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
