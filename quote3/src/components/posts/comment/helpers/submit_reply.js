export default async function SubmitReply(comment, parent_id) {
  const res = await fetch("/api/posts/comment/reply/add", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment, parent_id }),
  });

  if (!res.ok) {
    const e = await res.text();
    throw new Error(e);
  }
  const data = await res.json();

  return data.added;
}
