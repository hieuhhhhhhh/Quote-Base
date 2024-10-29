import { useState } from "react";
import styles from "./comment.module.css";
import ReplyParent from "./reply/parent";
import useFormat from "./helpers/format_time";

export default function Comment({ each }) {
  const [formattedTime, setFtime] = useState("");
  useFormat(each.birth_time, setFtime);

  return (
    <div className={styles.comment}>
      <div className={styles.column1}>
        <div className="avatarHolder">
          <img
            src={each.commenter.avatar || "/default_pfp.webp"}
            className="avatar"
            alt={`${each.commenter.name}'s avatar`} // Added alt text for accessibility
          />
        </div>
      </div>
      <div className={styles.column2}>
        <div className={styles.title}>
          <span className={styles.name}>{each.commenter.name}</span>
          <span className={styles.birth_time}>{formattedTime}</span>
        </div>
        <div>{each.comment}</div>
        <ReplyParent parent={each} />
      </div>
    </div>
  );
}
