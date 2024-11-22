"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/wrappers/modal";
import Notification from "./notification";
import PostDetails from "@/components/posts/post_details";
import styles from "./notification.module.css";

export default function NotificationsBoard({
  fetchNotifications,
  emptyMsg,
  tittle,
}) {
  const [notifications, setNotifications] = useState([]);
  const [notiOpen, setNotiOpen] = useState(false);
  const [seId, setSeId] = useState(null);
  const [seIndex, setSeIndex] = useState(null);
  const [msg, setMsg] = useState("");

  const fetch = async () => {
    const res = await fetchNotifications();
    setNotifications(res);
    if (res && res.length === 0) setMsg(emptyMsg);
  };

  useEffect(() => {
    if (notiOpen) {
      fetch();
    } else {
      setSeId(null);
      setSeIndex(null);
    }
  }, [notiOpen]);

  return (
    <div
      onClick={() => {
        setNotiOpen(!notiOpen);
      }}
    >
      <div className={styles.btnLabel}>{tittle}</div>
      <Modal modalOpen={notiOpen} setModalOpen={setNotiOpen}>
        <div className={styles.main}>
          <div className={styles.notifications}>
            <div className={styles.tittle}>{tittle}</div>

            {notifications &&
              notifications.map((e, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSeId(e.post_id);
                    setSeIndex(index);
                  }}
                  className={styles.index}
                  style={{
                    backgroundColor:
                      index === seIndex ? "var(--background)" : "",
                  }}
                >
                  <Notification notification={e} />
                </div>
              ))}
            <div>{msg}</div>
          </div>
          {seId && (
            <div className={styles.postDetails}>
              <PostDetails id={seId} />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
