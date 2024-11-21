// useSelector count: 1

"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import styles from "./header.module.css";
import { updateUserActions } from "../redux/action";
import Notifications from "./comps/notifications/parent";
import Reports from "./comps/reports/parent";

const Header = () => {
  const dispatch = useDispatch();

  const myId = useSelector((state) => state.myProfile.id); // Access myId from Redux
  const myAvatar = useSelector((state) => state.myProfile.avatar);
  const myRole = useSelector((state) => state.myProfile.role);

  return (
    <div className={styles.header}>
      <h2>
        <Link
          href="/"
          onClick={() => {
            dispatch(updateUserActions({ isCreatingPost: false }));
          }}
        >
          Quotes Base
        </Link>
      </h2>
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
            {myId ? (
              <Link
                href="/"
                onClick={() => {
                  dispatch(updateUserActions({ isCreatingPost: true }));
                }}
              >
                Create_Post
              </Link>
            ) : (
              <Link href="/pages/login">Create_Post</Link>
            )}
          </li>

          {myId && (
            <li>
              <Notifications />
            </li>
          )}

          {myId && myRole === "admin" && (
            <li>
              <Reports />
            </li>
          )}

          <li>
            {myId ? (
              <Link href="/pages/login/logout">Log Out</Link>
            ) : (
              <Link href="/pages/login">Log In</Link>
            )}
          </li>

          {myId && (
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
