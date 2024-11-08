let isBusy = false; // to prevent multiple submissions

async function addPost(
  content,
  author,
  base64_bg_img,
  background_color,
  text_is_white
) {
  if (isBusy) return;

  try {
    isBusy = true;
    const res = await fetch("/api/posts/new_post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        author,
        base64_bg_img: base64_bg_img?.split(",")[1],
        background_color,
        text_is_white,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data = await res.json();
    console.log("Post added successfully, ID:", data.post_id);
    return data.post_id; // Return the new post ID

    //
  } catch (e) {
    console.error("Error(submit_post.js):", e);
    return; // Return undefined on failure

    //
  } finally {
    isBusy = false; // Reset submitting state
  }
}

export default addPost;
