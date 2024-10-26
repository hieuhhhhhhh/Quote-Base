import { useState, useEffect } from "react";
import fetchAllComments from "./helpers/fetch_all";
import Comment from "./comment";
import CommentInput from "./input";
import { useSelector } from "react-redux";

export default function CommentsParent({ post_id }) {
  const [rows, setRows] = useState([]);
  const myProfile = useSelector((state) => state.myProfile);

  const onAddComment = (comment) => {
    const row = {
      comment: comment,
      commenter: {
        avatar: myProfile.avatar,
        name: myProfile.alias ?? myProfile.username,
      },
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
      <CommentInput post_id={post_id} onAddComment={onAddComment} />
      {rows.map((each, index) => (
        <Comment each={each} index={index} />
      ))}
    </div>
  );
}
