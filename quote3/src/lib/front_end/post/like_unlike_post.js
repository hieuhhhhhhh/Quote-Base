export default async function LikeUnlikePost(isLiked, post_id) {
  const path = isLiked ? "/api/posts/unlike" : "/api/posts/like";

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
