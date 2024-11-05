"use client";
import React, { useState } from "react";
import { PhotoshopPicker } from "react-color";

const ColorPicker = () => {
  const [color, setColor] = useState({ hex: "#fff" });

  const handleChangeComplete = (color) => {
    setColor(color);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Color Picker</h2>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: color.hex,
          marginBottom: "10px",
        }}
      />
      <PhotoshopPicker
        color={color.hex}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  );
};

export default ColorPicker;
