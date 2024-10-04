// useSelector count: 1

"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./header.module.css";

const Header = () => {
  const myId = useSelector((state) => state.myProfile.myId); // Access myId from Redux

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
            <Link href="/pages/token_check">Token Check</Link>
          </li>
          <li>
            <Link href="/pages/login">Log In</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
