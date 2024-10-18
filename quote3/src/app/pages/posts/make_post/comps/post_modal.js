import { useState, useRef, useEffect } from "react";
import styles from "./post_modal.module.css";
import update_FontSize_Width from "@/lib/front_end/post/dynamic_fontsize_width";
import AuthorModal from "./author_modal";

const PostModal = ({ closeModal }) => {
  const [input, setInput] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [width, setWidth] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const textareaRef = useRef(null);

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

  const openAuthorModal = () => {
    setIsModalOpen(true);
  };

  const closeAuthorModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Render the PostModal component if the modal is open */}
      {!isModalOpen ? (
        <div>
          <label>Content:</label>
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
              value={input}
              onChange={handleInput} // Use the handleInput function
              style={{ fontSize }} // Inline style for dynamic font size
            />
          </div>
          <br />
          <button onClick={openAuthorModal} disabled={!input.trim()}>Continue</button>
          <button onClick={closeModal}>Close</button>
        </div>
      ) : (
        <AuthorModal
          closeModal={closeModal}
          closeAuthorModal={closeAuthorModal}
          content={input}
        />
      )}
    </div>
  );
};

export default PostModal;
