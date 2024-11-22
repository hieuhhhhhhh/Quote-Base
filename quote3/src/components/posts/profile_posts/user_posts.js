import React, { useEffect, useState } from "react";
import { fetchPostIds } from "./helper/fetch_posts";
import fetchPreviews from "@/lib/front_end/post/fetch_previews";
import PostsBoard from "@/components/posts/posts_board";

export default function Posts({ user_id }) {
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

  // Render posts if available
  return loading ? (
    <p>Loading...</p>
  ) : previews.length === 0 ? (
    <p>No posts</p>
  ) : (
    <PostsBoard posts={previews} />
  );
}
