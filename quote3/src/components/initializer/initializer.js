// fetch: user's profile: id, username, alias, mini profile pic
// update: some global states in redux
// prevent: child components to mount before the task is completed
// useSelector count: 1

"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import styles from "./initializer.module.css";

import fetchMyBasicInfo from "@/lib/front_end/user_info/my_basic_info";

const Initializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("(initializer.js): Fetching...");

    fetchMyBasicInfo(dispatch);
  }, [dispatch]); // empty array => only run once

  const myId = useSelector((state) => state.myProfile.id); // Access myId from Redux

  // if myId not initialized yet, print loading screen
  if (myId !== null) return <div>{children}</div>;
  else
    return (
      <div className={styles.loader}>
        <ClipLoader color="inherit" size={100} />
      </div>
    );
};

export default Initializer;
