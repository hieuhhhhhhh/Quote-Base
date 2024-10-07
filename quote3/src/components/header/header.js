// useSelector count: 1

"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import styles from "./header.module.css";
import removeToken from "@/lib/front_end/authentication/logout";
import { resetMyProfile, updateMyProfile } from "../redux/action";

const Header = () => {
  const dispatch = useDispatch();

  const myId = useSelector((state) => state.myProfile.id); // Access myId from Redux

  // Clear all profile data
  const clearUserData = () => {
    removeToken();
    dispatch(resetMyProfile());
    dispatch(updateMyProfile({ id: "" }));
  };

  return (
    <div className={styles.header}>
      <h2>Quotes Base</h2>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/pages/about">About</Link>
          </li>

          <li>
            {/* Conditional Link based on existance of myId*/}
            <Link href={myId ? `/pages/profile/${myId}` : "/pages/login"}>
              Profile
            </Link>
          </li>

          <li>
            {/* Conditional Link based on existance of myId*/}
            <Link
              href={
                myId ? `/pages/posts/someone_posts/${myId}` : "/pages/login"
              }
            >
              My_Posts
            </Link>
          </li>

          <li>
            <Link href="/pages/posts/make_post">Make_Post</Link>
          </li>

          <li>
            <Link href="/pages/token_check">Token Check</Link>
          </li>

          <li>
            {myId != "" ? (
              <Link href="/" onClick={clearUserData}>
                Log Out
              </Link>
            ) : (
              <Link href="/pages/login">Log In</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
