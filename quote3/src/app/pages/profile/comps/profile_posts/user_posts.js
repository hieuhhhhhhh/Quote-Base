import React, { useEffect, useState } from "react";
import { fetchPostIds } from "./helper/fetch_posts";
import fetchPreviews from "@/lib/front_end/post/fetch_previews";
import PostsBoard from "@/components/posts/posts_board";
import styles from "./user_posts.module.css";

export default function Posts({ user_id, onShrink }) {
  // State to hold posts
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false); // For loading message

  useEffect(() => {
    // Fetch post IDs and previews in sequence
    const fetchData = async () => {
      setLoading(true); // Start loading
      // Step 1: Fetch post IDs
      const ids = await fetchPostIds(user_id);
      // Step 2: Fetch previews for those IDs
      if (ids && ids.length > 0) {
        const res = await fetchPreviews(ids);
        setPreviews(res);
      }
      setLoading(false); // End loading
    };

    fetchData();
  }, [user_id]);

  const onDeletePost = (post_id) => {
    // Iterate and turn matched ids to null
    const newPreviews = previews.filter((each) => each.id !== post_id);

    // Update the state
    setPreviews(newPreviews);
  };

  // Render posts if available
  return loading ? (
    <p className={styles.msg}>Loading...</p>
  ) : previews.length === 0 ? (
    <p className={styles.msg}>No posts to show</p>
  ) : (
    <PostsBoard
      posts={previews}
      onShrink={onShrink}
      onDeletePost={onDeletePost}
    />
  );
}
