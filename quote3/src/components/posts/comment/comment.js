import styles from "./comment.module.css";

export default function Comment({ each, index }) {
  return (
    <div key={index} className={styles.comment}>
      <div
        className="avatarHolder"
        style={{ marginRight: "15px", marginTop: "1.5px" }}
      >
        <img
          src={each.commenter.avatar || "/default_pfp.webp"}
          className="avatar"
        />
      </div>
      <div>user: {each.commenter.name}</div>
      <div> "{each.comment}"</div>
    </div>
  );
}
