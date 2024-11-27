// useSelector count: 1

"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faBell,
  faSignOutAlt,
  faUser,
  faPenToSquare,
  faSignInAlt,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
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
              <FontAwesomeIcon title="Home" icon={faHome} size="lg" />
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
                <FontAwesomeIcon
                  title="Write a Post"
                  icon={faPenToSquare}
                  size="lg"
                />
              </Link>
            ) : (
              <Link href="/pages/login">
                <FontAwesomeIcon
                  title="Write a Post"
                  icon={faPenToSquare}
                  size="lg"
                />
              </Link>
            )}
          </li>

          <li>
            <Link href="/pages/trending">
              <FontAwesomeIcon title="Trending" icon={faFire} size="lg" />
            </Link>
          </li>

          {myId && (
            <li>
              <Link href="/pages/search">
                <FontAwesomeIcon title="Search" icon={faSearch} size="lg" />
              </Link>
            </li>
          )}

          {myId && (
            <li>
              <Notifications>
                <FontAwesomeIcon icon={faBell} size="lg" />
              </Notifications>
            </li>
          )}

          {myId && myRole === "admin" && (
            <li>
              <Reports />
            </li>
          )}

          {!myId && (
            <li>
              <Link href="/pages/login">
                <FontAwesomeIcon title="Login" icon={faSignInAlt} size="lg" />
              </Link>{" "}
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
                      <div className={styles.modalBtn}>
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ marginRight: "10px" }}
                        />
                        <span>My Profile</span>
                      </div>
                    </Link>
                    <Link
                      href="/pages/login/logout"
                      onClick={() => {
                        setAvatarModal(false);
                      }}
                      style={{ width: "100%" }}
                    >
                      <div className={styles.modalBtn}>
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          style={{ marginRight: "10px" }}
                        />
                        <span>Log Out</span>
                      </div>
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
