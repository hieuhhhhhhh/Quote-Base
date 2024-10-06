const fetchPosts = async (user_id, setPosts) => {
  try {
    const res = await fetch("/api/posts/someone_posts", {
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
    setPosts(data);

    //
  } catch (error) {
    console.error("Error (someone_posts/page.js):", error);
  }
};

export default fetchPosts;
