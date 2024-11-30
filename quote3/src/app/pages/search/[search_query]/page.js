"use client";
import { useEffect, useState } from "react";
import fetchPreviews from "@/lib/front_end/post/fetch_previews";
import PostsBoard from "@/components/posts/posts_board";
import styles from "./Search.module.css";

export default function Search({ params }) {
  const term = decodeURIComponent(params.search_query);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [idCount, setIdCount] = useState(-1);
  const [onShrink, setOnShrink] = useState(false);

  useEffect(() => {
    const submit = async () => {
      try {
        setPreviews([]);
        setLoading(true); // Start loading

        const res = await fetch("/api/posts/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ term }),
        });

        const { ids } = await res.json();
        setIdCount(ids.length);

        if (!res.ok) {
          console.error("Error (search):", data.error);
          setLoading(false); // Stop loading
          return; // Exit
        }

        const previews = await fetchPreviews(ids);
        setPreviews(previews);
      } catch (err) {
        console.error("Error (search):", err);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    submit();
  }, []);

  return (
    <div className={styles.searchContainers}>
      <div className={onShrink ? "shrinkForDetails" : styles.formContainer}>
        <div className={styles.statusContainer}>
          <br />
          {loading && <p>Loading...</p>} {/* Loading status */}
          {!loading && idCount >= 0 && <h2>Found {idCount} posts</h2>}
          <br />
          <br />
        </div>
      </div>
      <PostsBoard posts={previews} onShrink={setOnShrink} />
    </div>
  );
}
