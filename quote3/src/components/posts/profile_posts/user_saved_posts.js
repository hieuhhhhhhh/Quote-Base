import React, { useEffect, useState } from "react";
import { fetchSavedPostIds } from "./helper/fetch_posts";
import fetchPreviews from "@/lib/front_end/post/fetch_previews";
import PostsBoard from "@/components/posts/posts_board";

export default function SavedPosts({ user_id, onShrink }) {
  // State to hold posts
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false); // For loading message
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    // Fetch post IDs and previews in sequence
    const fetchData = async () => {
      setLoading(true); // Start loading
      setPreviews([]); // Clear previous data which will remove the last post being displayed if necessary
      // Step 1: Fetch post IDs
      const ids = await fetchSavedPostIds(user_id);
      // Step 2: Fetch previews for those IDs
      if (ids && ids.length > 0) {
        const res = await fetchPreviews(ids);
        setPreviews(res);
      }
      setLoading(false); // End loading
    };

    fetchData();
  }, [user_id, refetch]);

  // Render posts if available
  return loading ? (
    <p>Loading...</p>
  ) : previews.length === 0 ? (
    <p>No posts saved</p>
  ) : (
    <PostsBoard posts={previews} onShrink={onShrink} refetch={setRefetch} />
  );
}
