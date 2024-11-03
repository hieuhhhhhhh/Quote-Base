import { useState, useEffect } from "react";
import fetchAllComments from "./helpers/fetch_all_comments";
import Comment from "./comment";
import CommentInput from "./input";
import { useSelector } from "react-redux";

export default function CommentsParent({ post_id }) {
  const [rows, setRows] = useState([]);
  const myProfile = useSelector((state) => state.myProfile);

  const onAddComment = (added) => {
    const row = {
      comment: added.comment,
      commenter: {
        avatar: myProfile.avatar,
        name: myProfile.name,
      },
      id: added.id,
      birth_time: added.birth_time,
    };

    setRows((prev) => [row, ...prev]);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetchAllComments(post_id);
        setRows(res);
      } catch (e) {
        console.error("Error (comments.js): ", e.message);
      }
    };

    fetch();
  }, [post_id]);
  return (
    <div>
      <p></p>
      <CommentInput post_id={post_id} onAddComment={onAddComment} />
      {rows.map((each, index) => (
        <Comment each={each} key={index} />
      ))}
    </div>
  );
}
