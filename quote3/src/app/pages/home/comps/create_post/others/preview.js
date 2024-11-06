import styles from "../create_post.module.css";

export default function Preview({
  width,
  fontSize,
  img,
  content,
  author,
  BGcolor,
  whiteText,
}) {
  const textColor =
    whiteText === false ? "var(--dark-text)" : "var(--light-text)";

  return (
    <div
      className={styles.resultContainer}
      style={{
        backgroundColor: BGcolor || "var(--post-background)", // Set to "var(--foreground)" if BGcolor is null
        width,
        fontSize,
        backgroundImage: img ? `url(${img})` : "none", // Set to 'none' if img is null
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        color: textColor,
      }}
    >
      <div>{content}</div>
      {author && <div className={styles.author}>- {author}</div>}
    </div>
  );
}
