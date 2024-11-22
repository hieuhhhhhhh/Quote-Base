// useSelector count: 1

"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import styles from "./header.module.css";
import { updateUserActions } from "../redux/action";
import Notifications from "./comps/notifications/parent";
import Reports from "./comps/reports/parent";
import { useState } from "react";
import { AbsoluteModal } from "../wrappers/absolute_modal";

const Header = () => {
  const dispatch = useDispatch();

  const myId = useSelector((state) => state.myProfile.id); // Access myId from Redux
  const myAvatar = useSelector((state) => state.myProfile.avatar);
  const myRole = useSelector((state) => state.myProfile.role);

  const [avatarModal, setAvatarModal] = useState(false);

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

          {!myId && (
            <li>
              <Link href="/pages/login">Log In</Link>{" "}
            </li>
          )}

          {myId && (
            <li>
              <div style={{ position: "relative" }}>
                <div
                  className="avatarHolder"
                  onClick={(event) => {
                    setAvatarModal(!avatarModal);
                    event.stopPropagation();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={myAvatar || "/default_pfp.webp"}
                    className="avatar"
                  />
                </div>
                <AbsoluteModal
                  modalOpen={avatarModal}
                  setModalOpen={setAvatarModal}
                >
                  <div className={styles.modalBtnContainer}>
                    <Link
                      href={myId ? `/pages/profile/${myId}` : "/pages/login"}
                      onClick={() => {
                        setAvatarModal(false);
                      }}
                    >
                      <div className={styles.modalBtn}>View My Profile</div>
                    </Link>
                    <Link
                      href="/pages/login/logout"
                      onClick={() => {
                        setAvatarModal(false);
                      }}
                      style={{ width: "100%" }}
                    >
                      <div className={styles.modalBtn}>Log Out</div>
                    </Link>
                  </div>
                </AbsoluteModal>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
