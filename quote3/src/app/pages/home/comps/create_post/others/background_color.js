import { useState } from "react";
import { CompactPicker } from "react-color";

export default function BackgroundColor({ preview, onDone, BGcolor }) {
  const [color, setColor] = useState(BGcolor || "var(--post-background)");

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  return (
    <div>
      {preview({ testBGcolor: color, testImg: null })}

      {/* Pass the custom colors to the CompactPicker */}
      <CompactPicker color={color} onChangeComplete={handleColorChange} />
      <div>
        <button onClick={() => onDone(BGcolor)}>Cancel</button>
        <button onClick={() => onDone(color)}>Save</button>
      </div>
    </div>
  );
}
