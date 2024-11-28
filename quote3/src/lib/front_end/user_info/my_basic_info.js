// take: token
// do: match some states in redux to data in db
// return: nothing
// fetches count: 2
// redux dispatch count: 3

import { updateMyProfile } from "@/components/redux/action"; // redux actions

async function fetchMyBasicInfo(dispatch) {
  console.log("(my_basic_info.js): Fetching... ");
  try {
    const res = await fetch("/api/user_info/my_info", {
      method: "GET",
      credentials: "include", // To include cookies with the request
    });

    if (!res.ok) {
      const { message } = await res.json();
      console.log(message);
      throw new Error(message);
    }

    // 3.0: Success, update global states with redux
    const data = await res.json();

    dispatch(
      updateMyProfile({
        id: data.id,
        name: data.name,
        avatar: data.avatar,
        bio: data.bio,
        role: data.role,
        ads: data.ads,
      })
    );

    return;

    // 3.1: Failure
  } catch (e) {
    console.log("Error (my_basic_info.js):", e);
    return;
  }
}

export default fetchMyBasicInfo;
