"use client";

import { useSelector } from "react-redux";
import MyProfile from "../comps/my_profile";
import NotMyProfile from "../comps/someone_profile";

export default function Page({ params }) {
  // Determine if user is accessing their profile or viewing someone else's
  const myId = useSelector((state) => state.profile.myId);

  // Conditionally render:
  if (myId == params.user_id) {
    return <MyProfile />;
  } else {
    return <NotMyProfile user_id={params.user_id} />;
  }
}
