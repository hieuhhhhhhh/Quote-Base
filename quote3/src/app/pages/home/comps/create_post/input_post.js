
import { useState, useRef, useEffect } from "react";
import update_FontSize_Width from "@/lib/front_end/post/dynamic_fontsize_width";
import styles from "./create_post.module.css";
import TextareaAutosize from "react-textarea-autosize";

export default function CPinput({ content, setContent, onNext, onBack, setAuthor }) {
  const [fontSize, setFontSize] = useState("");

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value || "Anonymous");
  };

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

  const onPasteContent = (e) => {
    e.preventDefault(); // Prevent default paste behavior
    const pastedText = e.clipboardData.getData("text");
    setContent((prevContent) => prevContent + pastedText); // Append pasted text to existing content
  };

  return (
    <div>
      <label>
        Author's Name : 
        <input type="textbox" onChange={handleAuthorChange} placeholder="Enter Author's Name" />
      </label>
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
          onPaste={onPasteContent}
          style={{ fontSize }} 
        />
      </div>
      <div className={styles.footerButtons}>
        <button  onClick={onBack}>
          Discard
        </button>
        <button  onClick={onContinue} disabled={!content.trim()}>
          Next
        </button>
      </div>
    </div>
  );
}
