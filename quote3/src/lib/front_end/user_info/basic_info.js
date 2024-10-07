// take: user_id
// return: any user's basic information
// (check the route.js in api for more details)
// fetches count: 1

export const getBasicInfo = async (user_id) => {
  console.log("(basic_info.js): Fetching... ");

  const res = await fetch("/api/user_info/basic_info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id }),
  });

  // Check response
  if (res.ok) {
    const data = await res.json();
    return data; // Return the fetched data
  } else {
    const data = await res.json();
    throw new Error(data.error); // Throw an error for handling in the component
  }
};
