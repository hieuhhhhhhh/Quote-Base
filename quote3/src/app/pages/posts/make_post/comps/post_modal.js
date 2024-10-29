import { useState, useRef, useEffect } from "react";
import styles from "./post_modal.module.css";
import update_FontSize_Width from "@/lib/front_end/post/dynamic_fontsize_width";
import addPost from "../helpers/submit_post";

const PostModal = ({ closeModal }) => {
  const [content, setContent] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [width, setWidth] = useState("");
  const [author, setAuthor] = useState("");

  const textareaRef = useRef(null);

  const onInputContent = (e) => {
    const value = e.target.value;
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    // Limit the height to 170px
    if (textarea.scrollHeight > 170) {
      return; // Don't update the input if it exceeds the limit
    }
    setContent(value);
  };

  useEffect(() => {
    // Call getFontSize when input changes
    update_FontSize_Width(content, setFontSize, setWidth);
  }, [content]); // Ensure effect runs when 'input' changes

  const onInputAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleContinue = async () => {
    try {
      const res = await addPost(content, author); // Await the addPost function
      if (res) {
        setContent("");
        setAuthor("");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button onClick={closeModal}>Close</button>
      <div
        className={styles.textareaContainer}
        onClick={() => textareaRef.current.focus()}
      >
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          type="text"
          rows={1}
          placeholder="Type here..."
          value={content}
          onChange={onInputContent} // Use the handleInput function
          style={{ fontSize }} // Inline style for dynamic font size
        />
      </div>
      <div>
        <input
          type="text"
          value={author}
          placeholder="Author"
          onChange={onInputAuthor}
        ></input>
      </div>

      <button onClick={handleContinue}>Continue</button>

      <div className={styles.resultContainer} style={{ width, fontSize }}>
        {content}
      </div>
    </div>
  );
};

export default PostModal;
