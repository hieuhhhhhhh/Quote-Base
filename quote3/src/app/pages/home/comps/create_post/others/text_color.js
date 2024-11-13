import { useState } from "react";
import styles from "../background_img/background_img.module.css";

export default function TextColor({ preview, onDone, whiteText }) {
  const [isWhite, setIsWhite] = useState(whiteText);

  return (
    <div>
      <div className={styles.footerButtons}>
        <button onClick={() => setIsWhite(true)}>Light</button>
        <button onClick={() => setIsWhite(false)}>Dark</button>
      </div>

      {preview({ testWT: isWhite })}

      {/* Pass the custom colors to the CompactPicker */}
      <div className={styles.footerButtons}>
        <button onClick={() => onDone(whiteText)}>Cancel</button>
        <button onClick={() => onDone(isWhite)}>Save</button>
      </div>
    </div>
  );
}
