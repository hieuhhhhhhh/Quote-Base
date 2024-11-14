import styles from "./create_post.module.css";

export default function CPauthor({ author, setAuthor, onNext, onBack }) {
  const onContinue = () => {
    setAuthor(author.trim() || "Anonymous");
    onNext();
  };

  const handleAuthorChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 40) {
      setAuthor(inputValue);
    }
  };

  return (
    <div>
      <div className={styles.authorAreaContainer}>
        <label className={styles.label}>
          Would you like to display the author's name?
          <input
            type="text"
            value={author}
            placeholder="Enter Author's Name"
            onChange={handleAuthorChange}
            className={styles.inputField}
          />
        </label>
      </div>
      <div className={styles.footerButtons}>
        <button onClick={onBack}>Back</button>
        <button onClick={onContinue}>Continue</button>
      </div>

    </div>
  );
}