import styles from "../post_board.module.css";
import { useState, useEffect } from "react";
import update_FontSize_Width from "@/lib/front_end/post/dynamic_fontsize_width";

export default function Preview({ img, content, author, BGcolor, whiteText }) {
  const [fontSize, setFontSize] = useState("");
  const [width, setWidth] = useState("");
  const textColor =
    whiteText === false ? "var(--dark-text)" : "var(--light-text)";

  useEffect(() => {
    // Call getFontSize when input changes
    const concat = content + "\n" + "- " + author;
    update_FontSize_Width(concat, setFontSize, setWidth);
  }, [content, author]); // Ensure effect runs when 'input' changes

  return (
    <div
      className={`${styles.resultContainer} ${styles.clickable}`}
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
