// take: user_id
// return: (check the route.js in api for more details)
// fetches count: 1

export const getPublicInfo = async (user_id) => {
  console.log("(public_info.js): Fetching... ");

  const res = await fetch("/api/user_info/public_info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id }),
  });

  // Check the response
  if (res.ok) {
    const data = await res.json();
    return data; // Return the fetched data
  } else {
    const errorData = await res.json();
    throw new Error(errorData.error); // Throw an error
  }
};
