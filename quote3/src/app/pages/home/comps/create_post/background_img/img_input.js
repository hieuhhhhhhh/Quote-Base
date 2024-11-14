
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage} from "@fortawesome/free-solid-svg-icons";

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
      <div onClick={() => { inputRef.current.click(); }}>
        <FontAwesomeIcon icon={faImage} title="Upload Background Image" />
      </div>
      
    </span>
  );
}

                
                

