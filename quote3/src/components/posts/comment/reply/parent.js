import { useEffect, useState } from "react";
import fetchAllReplies from "../helpers/fetch_all_replies";
import { useSelector } from "react-redux";
import ReplyInput from "./input";
import Reply from "./reply";
import styles from "../comment.module.css";

export default function ReplyParent({ parent }) {
  const [inputOpen, setIOpen] = useState(false);
  const [repliesOpen, setROpen] = useState(false);

  const [rows, setRows] = useState([]);
  const myProfile = useSelector((state) => state.myProfile);

  const onAddReply = (added) => {
    const row = {
      comment: added.comment,
      commenter: {
        avatar: myProfile.avatar,
        name: myProfile.name,
      },
      parent_id: parent.id,
      id: added.id,
      birth_time: added.birth_time,
    };

    setRows((prev) => [row, ...prev]);
    setIOpen(false);
    setROpen(true);
  };

  const onShowReplies = async () => {
    if (repliesOpen) {
      setROpen(false);
      return;
    }

    setROpen(true);
    try {
      const res = await fetchAllReplies(parent.id);
      setRows(res);
    } catch (e) {
      console.error("Error (comments.js): ", e.message);
    }
  };

  useEffect(() => {
    setIOpen(false);
    setROpen(false);

    const fetch = async () => {
      try {
        const res = await fetchAllReplies(parent.id);
        setRows(res);
      } catch (e) {
        console.error("Error (reply/parent.js): ", e.message);
      }
    };

    fetch();
  }, [parent]);

  return (
    <div>
      <button
        className={styles.button}
        onClick={() => {
          setIOpen(true);
        }}
      >
        Reply
      </button>

      {inputOpen && (
        <ReplyInput
          parent_id={parent.id}
          onAddReply={onAddReply}
          onClose={() => {
            setIOpen(false);
          }}
        />
      )}
      {parent.replies > 0 && (
        <>
          |
          <button className={styles.button} onClick={onShowReplies}>
            {parent.replies} Replies
          </button>
        </>
      )}
      {repliesOpen &&
        rows.map((each, index) => <Reply each={each} key={index} />)}
    </div>
  );
}
