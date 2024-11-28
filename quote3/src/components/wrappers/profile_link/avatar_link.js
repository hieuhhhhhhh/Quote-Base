import Link from "next/link";
import styles from "./profile_link.module.css";

export default function AvatarLink({ children, user_id }) {
  return (
    <Link href={user_id ? `/pages/profile/${String(user_id)}` : "#"}>
      <span className={styles.avatarWrap}>{children}</span>
    </Link>
  );
}
