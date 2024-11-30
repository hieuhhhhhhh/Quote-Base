export default async function DeletePost(id, role) {
  const path = "/api/posts/delete_post";

  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post_id: id, role: role }),
  });

  if (!res.ok) {
    const msg = await res.text();
    console.error(msg);
    throw Error(msg);
  }
}
