import { useEffect, useState } from "react";
import update_FontSize_Width from "@/lib/front_end/post/dynamic_fontsize_width";
import Preview from "./others/preview";
import styles from "./create_post.module.css";

export default function CPpreview({
  content,
  author,
  onFinish,
  onBack,
  img,
  BGcolor,
  whiteText,
}) {
  const [fontSize, setFontSize] = useState("");
  const [width, setWidth] = useState("");

  useEffect(() => {
    // Call getFontSize when input changes
    const concat = content + "\n" + "- " + author;
    update_FontSize_Width(concat, setFontSize, setWidth);
  }, [content, author]); // Ensure effect runs when 'input' changes

  return (
    <div>
      <h2 style={{ textAlign: 'center'}}> Final Preview </h2>

      <Preview
        width={width}
        fontSize={fontSize}
        content={content}
        author={author}
        img={img}
        BGcolor={BGcolor}
        whiteText={whiteText}
      />
      <div className={styles.footerButtons}>
        <button onClick={() => { onBack(); }} >
          Back
        </button>
        <button onClick={() => { onFinish(); }}>
          Post
        </button>
      </div>
    </div>
  );
}
