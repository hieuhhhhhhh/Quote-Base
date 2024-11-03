export default async function fetchAllComments(post_id) {
  const res = await fetch("/api/posts/comment/fetch_all", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ post_id }),
  });

  if (!res.ok) {
    const e = await res.text();
    throw new Error(e);
  }

  const data = await res.json();

  return data;
}
