import useFormat from "@/components/posts/comment/helpers/format_time";
import { useEffect, useState } from "react";
import styles from "./notification.module.css";

export default function Notification({ notification }) {
  const [formattedTime, setFtime] = useState("");
  const [msg, setMsg] = useState("");
  useFormat(notification.birth, setFtime);

  useEffect(() => {
    let msg;
    switch (notification.source_table) {
      case "likes":
        msg = " liked your post";
        break;
      case "comments":
        msg = " commented on your post";
        break;
      case "reports":
        msg = " reported a post";
        break;
    }
    setMsg(msg);
  }, [notification.source_table]);

  return (
    <div className={styles.container}>
      <div>
        <div className="avatarHolder">
          <img
            src={notification.avatar || "/default_pfp.webp"}
            className="avatar"
          />
        </div>
      </div>
      <div style={{ marginLeft: "10px" }}>
        <span className={styles.msg}>
          <b>{notification.alias || notification.user_name}</b>
          {msg}
        </span>
        <div className={styles.birth}>{formattedTime}</div>
      </div>
    </div>
  );
}
