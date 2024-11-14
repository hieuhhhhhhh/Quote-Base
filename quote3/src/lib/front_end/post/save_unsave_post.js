export default async function SaveUnsavePost(isSaved, post_id) {
  const path = isSaved ? "/api/posts/saved_posts/unsave" : "/api/posts/saved_posts/save";

  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post_id: post_id }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.log(error);
  }
}
