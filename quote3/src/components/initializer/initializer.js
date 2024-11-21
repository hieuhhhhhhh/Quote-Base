// fetch: user's profile: id, username, alias, mini profile pic
// update: some global states in redux
// prevent: child components to mount before the task is completed
// useSelector count: 1

"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import styles from "./initializer.module.css";

import fetchMyBasicInfo from "@/lib/front_end/user_info/my_basic_info";

const Initializer = ({ children }) => {
  const dispatch = useDispatch();
  const [isFetched, setIsFetched] = useState(false);

  const fetch = async () => {
    await fetchMyBasicInfo(dispatch);
    setIsFetched(true);
  };
  useEffect(() => {
    console.log("(initializer.js): Fetching...");

    fetch();
  }, []); // empty array => only run once

  // if myId not initialized yet, print loading screen
  if (isFetched) return <div>{children}</div>;
  else
    return (
      <div className={styles.loader}>
        <ClipLoader color="inherit" size={100} />
      </div>
    );
};

export default Initializer;
