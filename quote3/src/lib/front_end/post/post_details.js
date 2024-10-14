export default async function FetchPostDetail(post_id, user_id) {
  const res = await fetch("/api/posts/post_details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post_id: post_id, user_id: user_id }),
  });

  const data = await res.json();

  if (res.ok) {
    return data; // Return the fetched data
  } else {
    throw new Error(data.error); // Throw error
  }
}
