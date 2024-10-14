const fetchPreviews = async (ids) => {
  const res = await fetch("/api/posts/post_previews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });

  const { data } = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};

export default fetchPreviews;
