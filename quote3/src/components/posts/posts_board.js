import React, { useState, useEffect, useRef } from "react";
import styles from "./post_board.module.css"; // Import the CSS module
import PostPreviews from "./post_previews";
import PostDetails from "./post_details";

export default function PostsBoard({
  posts,
  onLoadMorePosts,
  onShrink = () => {},
}) {
  const [seID, setSeID] = useState(null); // seID = selected id
  const [detailsOpen, setDetailsOp] = useState(false);
  const loadingRef = useRef(null);

  const onClickPost = (id) => {
    setSeID(id); // Set the clicked post as selected
    setDetailsOp(true);
    onShrink(true);
  };

  const handleCloseDetails = () => {
    setDetailsOp(false);
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
      {detailsOpen && <PostDetails onClose={handleCloseDetails} id={seID} />}
      <div
        className={`${styles.postsList} ${detailsOpen ? styles.shrink : null}`}
      >
        <PostPreviews
          posts={posts}
          onClickPost={onClickPost}
          seID={seID}
          setSeID={setSeID}
          detailsOpen={detailsOpen}
        />
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
