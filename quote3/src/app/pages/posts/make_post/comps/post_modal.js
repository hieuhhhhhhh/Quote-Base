import { useState, useRef, useEffect } from "react";
import styles from "./post_modal.module.css";
import update_FontSize_Width from "@/lib/front_end/post/dynamic_fontsize_width";
import addPost from "../helpers/submit_post";

const PostModal = ({ closeModal }) => {
  const [titleInput, setTitleInput] = useState("");
  const [input, setInput] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [width, setWidth] = useState("");

  const textareaRef = useRef(null);

  const handleTitleInput = (e) => {
    setTitleInput(e.target.value);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    // Limit the height to 170px
    if (textarea.scrollHeight > 170) {
      return; // Don't update the input if it exceeds the limit
    }
    setInput(value);
  };

  useEffect(() => {
    // Call getFontSize when input changes
    update_FontSize_Width(input, setFontSize, setWidth);
  }, [input]); // Ensure effect runs when 'input' changes

  const handleContinue = async () => {
    try {
      const res = await addPost(titleInput, input); // Await the addPost function
      if (res) {
        setTitleInput("");
        setInput("");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button onClick={closeModal}>Close</button>

      <div className={styles.textareaContainer}>
        <textarea
          className={styles.textarea}
          type="text"
          rows={1}
          placeholder="Type Title Here..."
          value={titleInput}
          onChange={handleTitleInput} // Use the handleTitleInput function
          style={{ fontSize }} // Inline style for dynamic font size
        />
      </div>

      <div
        className={styles.textareaContainer}
        onClick={() => textareaRef.current.focus()}
      >
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          type="text"
          rows={1}
          placeholder="Type Content Here..."
          value={input}
          onChange={handleInput} // Use the handleInput function
          style={{ fontSize }} // Inline style for dynamic font size
        />
      </div>

      <button onClick={handleContinue}>Continue</button>

      <div className={styles.resultContainer} style={{ width, fontSize }}>
        {input}
      </div>
    </div>
  );
};

export default PostModal;
