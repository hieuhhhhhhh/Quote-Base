import { useState } from "react";

export default function TextColor({ preview, onDone, whiteText }) {
  const [isWhite, setIsWhite] = useState(whiteText);

  return (
    <div>
      {preview({ testWT: isWhite })}

      {/* Pass the custom colors to the CompactPicker */}
      <div>
        <button onClick={() => setIsWhite(true)}>Light</button>
        <button onClick={() => setIsWhite(false)}>Dark</button>
      </div>
      <div>
        <button onClick={() => onDone(whiteText)}>Cancel</button>
        <button onClick={() => onDone(isWhite)}>Save</button>
      </div>
    </div>
  );
}
