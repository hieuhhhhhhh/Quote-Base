import { useState, useRef } from "react";

import BeforeCrop from "./before_crop";
import AfterCrop from "./after_crop";

export default function CropImage({ onUpdate }) {
  const [rawImg, setRawImg] = useState(null);
  const [img, setImg] = useState(null);

  const inputRef = useRef(null);

  // Load image from file input
  const onSelectImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setRawImg(reader.result);
      reader.readAsDataURL(file);
    }
    if (inputRef.current) {
      inputRef.current.value = null; // Clear the file input
    }
  };

  const onSubmit = async () => {
    try {
      if (!img) {
        throw new Error("No data in img");
      }

      // Make a POST request to the API endpoint
      const res = await fetch("/api/user_info/profile_pic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ base64: img.split(",")[1] }), // Send base64 image in the body without the metadata
      });

      if (!res.ok) {
        const data = await res.json(); // Attempt to parse the response body
        throw new Error(data.message || "Unknown error."); // Use specific error message
      }

      const data = await res.json();
      console.log("Image uploaded successfully:", data.url);

      // Handle the result from the API as needed
    } catch (e) {
      console.error("Error (upload_pfp.js):", e);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onSelectImg}
      />
      {rawImg && (
        <BeforeCrop rawImg={rawImg} setImg={setImg} setRawImg={setRawImg} />
      )}
      {img && (
        <AfterCrop
          img={img}
          setImg={setImg}
          onSubmit={onSubmit}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}
