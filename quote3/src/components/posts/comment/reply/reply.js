import { useState, useEffect } from "react";
import styles from "../comment.module.css";
import ReplyParent from "./parent";
import useFormat from "../helpers/format_time";

export default function Reply({ each }) {
  const [formattedTime, setFtime] = useState("");

  useFormat(each.birth_time, setFtime);

  return (
    <div className={styles.comment}>
      <div className={styles.column1}>
        <div className="smallAvatarHolder">
          <img
            src={each.commenter.avatar || "/default_pfp.webp"}
            className="avatar"
          />
        </div>
      </div>
      <div className={styles.column2}>
        <div className={styles.title}>
          <span className={styles.name}>{each.commenter.name}</span>
          <span className={styles.birth_time}>{formattedTime}</span>
        </div>
        <div> {each.comment}</div>
        <ReplyParent parent={each} />
      </div>
    </div>
  );
}
