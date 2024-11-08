import { useState, useRef, useEffect } from "react";
import update_FontSize_Width from "@/lib/front_end/post/dynamic_fontsize_width";
import styles from "./create_post.module.css";
import TextareaAutosize from "react-textarea-autosize";

export default function CPpage1({ content, setContent, onNext }) {
  const [fontSize, setFontSize] = useState("");

  const TAref = useRef(null); // TA =  TAref.current

  useEffect(() => {
    TAref.current.focus();
    TAref.current.setSelectionRange(content.length, content.length);
  }, []);

  useEffect(() => {
    // Call getFontSize when input changes
    update_FontSize_Width(content, setFontSize, () => {});
  }, [content]); // Ensure effect runs when 'input' changes

  const onInputContent = (e) => {
    if (TAref.current.scrollHeight > 170) {
      return;
    }
    setContent(e.target.value);
  };

  const onContinue = () => {
    setContent(content.trim());
    onNext();
  };

  return (
    <div>
      <div
        className={styles.textareaContainer}
        onClick={() => TAref.current.focus()}
      >
        <TextareaAutosize
          ref={TAref}
          className={styles.textarea}
          type="text"
          placeholder="What's on your mind?"
          value={content}
          onChange={onInputContent}
          style={{ fontSize }} // Inline style for dynamic font size
        />
      </div>

      <button onClick={onContinue} disabled={!content.trim()}>
        Continue
      </button>
    </div>
  );
}
