import React, { useState, useEffect } from "react";
import styles from "./image_bar.module.css";
import fetchAdUrl from "./helper/fetch_ad_url";

const BottomImageBar = () => {
  const [url, setUrl] = useState(null); // State to hold the ad URL
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchAd = async () => {
      const result = await fetchAdUrl(); // Fetch the ad URL
      if (result.error) {
        setError(result.error); // Handle errors
        console.error("Failed to fetch ad URL:", result.error);
      } else {
        setUrl(result); // Set the fetched URL
      }
    };

    fetchAd();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Render fallback UI if no URL is fetched
  if (error) {
    return <div className={styles.bottomBar}>Error loading ad: {error}</div>;
  }

  if (!url) {
    return <div className={styles.bottomBar}>Loading ad...</div>;
  }

  // Render the image once the URL is available
  return (
    <div className={styles.bottomBar}>
      <img src={url} alt="Kitten Ad" className={styles.image} />
      <img src={url} alt="Kitten Ad" className={styles.image} />
      <img src={url} alt="Kitten Ad" className={styles.image} />
      <img src={url} alt="Kitten Ad" className={styles.image} />
      <img src={url} alt="Kitten Ad" className={styles.image} />
    </div>
  );
};

export default BottomImageBar;
