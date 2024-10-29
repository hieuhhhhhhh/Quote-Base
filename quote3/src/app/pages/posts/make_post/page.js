"use client";
import React, { useState } from "react";
import PostModal from "./comps/post_modal"; // Import the PostModal component

export default function MakePost() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Make a new post</button>

      {/* Render the PostModal component if the modal is open */}
      {isModalOpen && <PostModal closeModal={closeModal} />}
    </div>
  );
}
