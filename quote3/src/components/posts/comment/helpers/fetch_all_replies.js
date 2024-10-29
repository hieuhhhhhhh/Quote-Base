export default async function fetchAllReplies(parent_id) {
  const res = await fetch("/api/posts/comment/reply/fetch_all", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ parent_id: parent_id }),
  });

  if (!res.ok) {
    const e = await res.text();
    throw new Error(e);
  }

  const data = await res.json();

  return data;
}
