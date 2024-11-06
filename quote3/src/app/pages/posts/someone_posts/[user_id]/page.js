"use client";

import React, { useEffect, useState } from "react";
import fetchPostIds from "../helpers/fetch_posts";
import fetchPreviews from "@/lib/front_end/post/fetch_previews";
import PostsBoard from "@/components/posts/posts_board";

export default function Posts({ params }) {
  // Determine the user ID from params
  const user_id = params.user_id;

  // State to hold posts
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    // Fetch post IDs and previews in sequence
    const fetchData = async () => {
      // Step 1: Fetch post IDs
      const ids = await fetchPostIds(user_id);
      // Step 2: Fetch previews for those IDs
      if (ids && ids.length > 0) {
        const res = await fetchPreviews(ids);
        setPreviews(res);
      }
    };

    fetchData();
  }, [user_id]);

  // Render posts if available
  return <PostsBoard posts={previews} onShrink={() => {}} />;
}
