"use client";
import { useState, useEffect } from "react";
import fetchPreviews from "@/lib/front_end/post/fetch_previews";
import PostsBoard from "@/components/posts/posts_board";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

const Trending = () => {
  const [postIds, setPostIds] = useState([]); // Array of pure IDs
  const [previews, setPreviews] = useState([]);
  const [index, setIndex] = useState(0);
  const loadSize = 50;
  const [onLoadMorePosts, setOnLoadMorePosts] = useState(null);

  useEffect(() => {
    // Fetch new post IDs and reset index if index reaches the max
    const fetch = async () => {
      const res = await fetchTrendingIds();
      setPostIds(res);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (index < postIds.length) {
      setOnLoadMorePosts(async () => {
        const res = await fetchPreviews(postIds.slice(index, index + loadSize));
        setPreviews((prev) => [...prev, ...res]);
        setIndex(index + loadSize); // Increase index by loadSize
      });
    }

    if (index >= postIds.length) {
      console.log("close");
      setOnLoadMorePosts(() => {}); // Set to no-op function
    }
  }, [index, postIds]);

  return (
    <div>
      <h1 style={{ marginLeft: "20px" }}>
        <FontAwesomeIcon icon={faFire} />
        <span style={{ paddingLeft: "10px" }} />
        Trending
      </h1>

      <PostsBoard posts={previews} onLoadMorePosts={onLoadMorePosts} />
    </div>
  );
};

export default Trending;

// Fetch post IDs for ordered by likes
const fetchTrendingIds = async () => {
  const response = await fetch("/api/posts/trending_previews"); // Replace with your actual API endpoint
  const data = await response.json();

  if (!response.ok) {
    console.error(data.error || "Something went wrong");
  } else {
    return data.map((post) => post.id);
  }
};
