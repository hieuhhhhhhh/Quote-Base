// take: token
// do: match some states in redux to data in db
// return: nothing
// fetches count: 2
// redux dispatch count: 3

import { setUsername, setAlias, setMyId } from "@/components/redux/action"; // redux actions

async function fetchMyBasicInfo(dispatch) {
  console.log("(my_basic_info.js): Fetching... ");
  try {
    // 1: Get id by token stored in cookie
    const res1 = await fetch("/api/my_id", {
      method: "GET",
      credentials: "include", // To include cookies with the request
    });

    if (!res1.ok) {
      throw new Error("No token or invalid token");
    }

    const { myId } = await res1.json();

    // 2: Use user ID to get basic info
    const res2 = await fetch("/api/basic_user_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: myId }),
    });

    if (!res2.ok) {
      throw new Error("Failed to fetch basic user's information from db");
    }

    // 3.0: Success, update global states with redux
    const { alias, username } = await res2.json();

    dispatch(setMyId(myId));
    dispatch(setAlias(alias));
    dispatch(setUsername(username));

    return;

    // 3.1: Failure
  } catch (e) {
    console.log("Error (my_basic_info.js):", e);
    dispatch(setMyId(""));
    return;
  }
}

export default fetchMyBasicInfo;
