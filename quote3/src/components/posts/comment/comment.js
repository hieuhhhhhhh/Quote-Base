import { useState } from "react";
import styles from "./comment.module.css";
import ReplyParent from "./reply/parent";
import useFormat from "./helpers/format_time";
import AvatarLink from "@/components/wrappers/profile_link/avatar_link";
import NameLink from "@/components/wrappers/profile_link/name_link";

export default function Comment({ each }) {
  const [formattedTime, setFtime] = useState("");
  useFormat(each.birth_time, setFtime);

  return (
    <div className={styles.comment}>
      <div className={styles.column1}>
        <AvatarLink user_id={each.commenter_id}>
          <div className="avatarHolder">
            <img
              src={each.commenter.avatar || "/default_pfp.webp"}
              className="avatar"
              alt={`${each.commenter.name}'s avatar`} // Added alt text for accessibility
            />
          </div>
        </AvatarLink>
      </div>
      <div className={styles.column2}>
        <div className={styles.title}>
          <NameLink user_id={each.commenter_id}>
            <span className={styles.name}>{each.commenter.name}</span>
          </NameLink>
          <span className={styles.birth_time}>{formattedTime}</span>
        </div>
        <div>{each.comment}</div>
        <ReplyParent parent={each} />
      </div>
    </div>
  );
}
