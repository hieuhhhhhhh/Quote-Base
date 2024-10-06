"use client";

import React, { useEffect, useState } from "react";
import fetchPosts from "../helpers/fetch_posts";
import PostsBoard from "@/components/posts/posts_board";

export default function Posts({ params }) {
  // Determine the user ID from params
  const user_id = params.user_id;

  // State to hold posts
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts(user_id, setPosts);
  }, []);

  // Render posts if available
  return <PostsBoard posts={posts}></PostsBoard>;
}
