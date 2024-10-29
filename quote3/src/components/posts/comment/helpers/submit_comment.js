export default async function SubmitComment(comment, post_id) {
  const res = await fetch("/api/posts/comment/add", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment, post_id }),
  });

  if (!res.ok) {
    const e = await res.text();
    throw new Error(e);
  }
  const data = await res.json();

  return data.added;
}
