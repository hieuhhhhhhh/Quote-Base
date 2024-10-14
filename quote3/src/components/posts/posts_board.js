import React, { useState, useEffect, useRef } from "react";
import styles from "./post_board.module.css"; // Import the CSS module
import PostPreviews from "./post_previews";
import PostDetails from "./post_details";

export default function PostsBoard({ posts, onLoadMorePosts = () => {} }) {
  const [selectedID, setSelectedID] = useState(null); // To track the selected post
  const loadingRef = useRef(null);

  const onClickPost = (id) => {
    setSelectedID(id); // Set the clicked post as selected
  };

  const handleCloseDetails = () => {
    setSelectedID(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the loading div is seenable
        if (entries[0].isIntersecting) {
          onLoadMorePosts();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current); // Start observing the loading div
    }
  }, [loadingRef, onLoadMorePosts]);

  return (
    <div>
      {selectedID && (
        <PostDetails onClose={handleCloseDetails} id={selectedID} />
      )}

      <div className={`${styles.postsList} ${selectedID && styles.shrink}`}>
        <PostPreviews posts={posts} onClickPost={onClickPost} />
        <div style={{ height: "60px" }}></div>
        <div ref={loadingRef}>Loading...</div>
        <div style={{ height: "60px" }}></div>
      </div>
    </div>
  );
}
