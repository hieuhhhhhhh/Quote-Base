// useSelector count: 1

"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import styles from "./header.module.css";
import { updateUserActions } from "../redux/action";
import LogOutArea from "./comps/logout_area";

const Header = () => {
  const dispatch = useDispatch();

  const myId = useSelector((state) => state.myProfile.id); // Access myId from Redux
  const myAvatar = useSelector((state) => state.myProfile.avatar);

  // Clear all profile data

  return (
    <div className={styles.header}>
      <h2>Quotes Base</h2>
      <nav>
        <ul>
          <li>
            <Link
              href="/"
              onClick={() => {
                dispatch(updateUserActions({ isCreatingPost: false }));
              }}
            >
              Home
            </Link>
          </li>

          <li>
            <Link href="/pages/about">About</Link>
          </li>
          <li>
            <Link href="/pages/search">Search</Link>
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
            <Link
              href={myId ? `/pages/posts/saved_posts/${myId}` : "/pages/login"}
            >
              Saved_Posts
            </Link>
          </li>

          <li>
            <Link
              href="/"
              onClick={() => {
                dispatch(updateUserActions({ isCreatingPost: true }));
              }}
            >
              Create_Post
            </Link>
          </li>

          {myId != "" && (
            <li>
              <Link href="/pages/notifications">Notifications</Link>
            </li>
          )}

          <li>
            <Link href="/pages/token_check">Token Check</Link>
          </li>

          <li>
            {myId != "" ? (
              <LogOutArea>Log Out</LogOutArea>
            ) : (
              <Link href="/pages/login">Log In</Link>
            )}
          </li>

          {myId != "" && (
            <li>
              <Link href={`/pages/profile/${myId}`}>
                <div className="avatarHolder">
                  <img
                    src={myAvatar || "/default_pfp.webp"}
                    className="avatar"
                  />
                </div>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
