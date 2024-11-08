import { useEffect, useState } from "react";
import update_FontSize_Width from "@/lib/front_end/post/dynamic_fontsize_width";
import Preview from "./others/preview";

export default function CPpage4({
  content,
  author,
  onFinish,
  onBack,
  img,
  BGcolor,
  whiteText,
}) {
  const [fontSize, setFontSize] = useState("");
  const [width, setWidth] = useState("");

  useEffect(() => {
    // Call getFontSize when input changes
    const concat = content + "\n" + "- " + author;
    update_FontSize_Width(concat, setFontSize, setWidth);
  }, [content, author]); // Ensure effect runs when 'input' changes

  return (
    <div>
      <h3>Final Preview</h3>
      <Preview
        width={width}
        fontSize={fontSize}
        content={content}
        author={author}
        img={img}
        BGcolor={BGcolor}
        whiteText={whiteText}
      />

      <button
        onClick={() => {
          onBack();
        }}
      >
        Back
      </button>

      <button
        onClick={() => {
          onFinish();
        }}
      >
        Finish
      </button>
    </div>
  );
}
