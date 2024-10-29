import React, { useState, useEffect, useRef } from "react";
import styles from "./post_board.module.css"; // Import the CSS module
import PostPreviews from "./post_previews";
import PostDetails from "./post_details";

export default function PostsBoard({
  posts,
  onLoadMorePosts,
  onShrink = () => {},
}) {
  const [selectedID, setSelectedID] = useState(null); // To track the selected post
  const loadingRef = useRef(null);

  const onClickPost = (id) => {
    setSelectedID(id); // Set the clicked post as selected
    onShrink(true);
  };

  const handleCloseDetails = () => {
    setSelectedID(null);
    onShrink(false);
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

    if (loadingRef.current && onLoadMorePosts != undefined) {
      observer.observe(loadingRef.current); // Start observing the loading div
    }
  }, [onLoadMorePosts]);

  return (
    <div>
      {selectedID && (
        <PostDetails onClose={handleCloseDetails} id={selectedID} />
      )}
      <div
        className={`${styles.postsList} ${
          selectedID ? "shrinkForDetails" : ""
        }`}
      >
        <PostPreviews posts={posts} onClickPost={onClickPost} />
        {onLoadMorePosts && (
          <>
            <div style={{ height: "60px" }}></div>
            <div ref={loadingRef}>Loading...</div>
            <div style={{ height: "60px" }}></div>
          </>
        )}
      </div>
    </div>
  );
}
