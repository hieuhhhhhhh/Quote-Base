"use client";
import { useState, useEffect } from "react";
import fetchPreviews from "@/lib/front_end/post/fetch_previews";
import PostsBoard from "@/components/posts/posts_board";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import BottomImageBar from "@/components/ads/bottom_image_bar";
import styles from "./trending_page.module.css";

const Trending = () => {
  const [postIds, setPostIds] = useState([]); // Array of pure IDs
  const [timeRange, setTimeRange] = useState("all");
  const [previews, setPreviews] = useState([]);
  const [index, setIndex] = useState(0);
  const loadSize = 50;
  const [onLoadMorePosts, setOnLoadMorePosts] = useState(null);
  const [onShrink, setOnShrink] = useState(false);

  const ads = useSelector((state) => state.myProfile.ads);

  useEffect(() => {
    // Fetch new post IDs and reset index if index reaches the max
    const fetch = async () => {
      const res = await fetchTrendingIds(timeRange);
      setPostIds(res);
      setIndex(0); // Reset index on timeRange change
      setPreviews([]); // Clear previous previews
    };
    fetch();
  }, [timeRange]);

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

  const onDeletePost = (post_id) => {
    // Iterate and turn matched ids to null
    const newPostIds = postIds.filter((id) => id !== post_id);
    const newPreviews = previews.filter((each) => each.id !== post_id);

    // Update the state
    setPostIds(newPostIds);
    setPreviews(newPreviews);
  };

  return (
    <div>
      <div className={onShrink ? "shrinkForDetails" : ""}>
        <h1 style={{ marginLeft: "20px" }}>
          <FontAwesomeIcon icon={faFire} />
          <span style={{ paddingLeft: "10px" }} />
          Trending
        </h1>
      </div>

      <div>
        <button className={styles.button} onClick={() => setTimeRange("all")}>
          All Time
        </button>
        <button className={styles.button} onClick={() => setTimeRange("day")}>
          Day
        </button>
        <button className={styles.button} onClick={() => setTimeRange("week")}>
          Week
        </button>
        <button className={styles.button} onClick={() => setTimeRange("month")}>
          Month
        </button>
        <button className={styles.button} onClick={() => setTimeRange("year")}>
          Year
        </button>
      </div>

      <PostsBoard
        posts={previews}
        onLoadMorePosts={onLoadMorePosts}
        onShrink={setOnShrink}
        onDeletePost={onDeletePost}
      />

      {ads && <BottomImageBar />}
    </div>
  );
};

export default Trending;

// Fetch post IDs for ordered by likes
const fetchTrendingIds = async (timeRange) => {
  const res = await fetch("/api/posts/trending_previews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ timeRange }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(data.error || "Something went wrong");
  } else {
    return data.map((post) => post.id);
  }
};
