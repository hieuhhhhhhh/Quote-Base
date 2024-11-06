export default function CPpage2({ author, setAuthor, onNext, onBack }) {
  const onContinue = () => {
    setAuthor(author.trim());
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
      <div>Would you like to display the author's name?</div>
      <input
        type="text"
        value={author}
        placeholder="Author's Name"
        onChange={handleAuthorChange} // Updated to use the new function
      />
      <button onClick={onBack}>Back</button>
      <button onClick={onContinue}>Continue</button>
    </div>
  );
}
