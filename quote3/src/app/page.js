"use client";

import React, { useState } from "react";

const EditableDiv = () => {
  const [content, setContent] = useState("");

  const handleInputChange = (e) => {
    const newText = e.target.innerText.trim();

    setContent(newText);
    console.log(newText.split("\n").length);
  };

  return (
    <div
      contentEditable
      onInput={handleInputChange}
      suppressContentEditableWarning={true}
      style={{
        minHeight: "50px",
        alignItems: "center", // Center vertically
        border: "1px solid #ccc", // Optional: to visualize the editable area
        padding: "5px", // Optional: some padding for better UX
      }}
    />
  );
};

export default EditableDiv;
