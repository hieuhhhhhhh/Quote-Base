import { useState, useRef } from "react";

import BeforeCrop from "./before_crop";
import AfterCrop from "./after_crop";
import { useDispatch } from "react-redux";
import { updateMyProfile } from "@/components/redux/action"; // redux actions
import Modal from "@/components/wrappers/modal";

export default function CropImage({ onUpdate }) {
  const [rawImg, setRawImg] = useState(null);
  const [img, setImg] = useState(null);

  const inputRef = useRef(null);
  const dispatch = useDispatch(); // For redux

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

      // Get avatar and update redux
      const data = await res.json();
      console.log("Image uploaded successfully:", data.avatar);
      dispatch(
        updateMyProfile({
          avatar: data.avatar,
        })
      );

      //
    } catch (e) {
      console.error("Error (upload_pfp.js):", e);
    }
  };

  const setModalOpen = (modalOpen) => {
    if (!modalOpen) {
      setImg(null);
      setRawImg(null);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }} // Hide the actual file input
        onChange={onSelectImg}
      />
      <button
        onClick={() => {
          inputRef.current.click();
        }}
      >
        Upload Profile Picture
      </button>
      <Modal modalOpen={rawImg || img} setModalOpen={setModalOpen}>
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
      </Modal>
    </div>
  );
}
