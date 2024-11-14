const fetchSavedPostIds = async (user_id) => {
  try {
    const res = await fetch("/api/posts/saved_posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    });

    // Check if the response is ok
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "cant read error");
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Error (saved_posts/page.js):", error);
  }
};

export default fetchSavedPostIds;
