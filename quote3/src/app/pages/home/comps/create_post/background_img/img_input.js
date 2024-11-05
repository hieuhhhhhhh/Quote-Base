import { useRef } from "react";

export default function ImgInput({ setRawImg, onDone }) {
  const inputRef = useRef(null);

  const afterSelectFile = (event) => {
    setRawImg(null);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setRawImg(reader.result);
      reader.readAsDataURL(file);
    }
    onDone();
  };

  return (
    <span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }} // Hide the actual file input
        onChange={afterSelectFile}
      />
      <button
        onClick={() => {
          inputRef.current.click();
        }}
      >
        Upload Background Picture
      </button>
    </span>
  );
}
