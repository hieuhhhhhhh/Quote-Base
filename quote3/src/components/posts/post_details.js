import styles from "./post_board.module.css";
import { useState, useEffect } from "react";
import FetchPostDetail from "@/lib/front_end/post/post_details";
import LikeUnlikePost from "@/lib/front_end/post/like_unlike_post";
import { useSelector } from "react-redux";
function PostDetails({ id, onClose }) {
  const [data, setData] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const myId = useSelector((state) => state.myProfile.id);

  const onLikeUnlike = () => {
    LikeUnlikePost(isLiked, id);
    setIsLiked(!isLiked);

    setData((prev) => ({
      ...prev,
      likes: prev.likes + (isLiked ? -1 : 1),
    }));
  };

  useEffect(() => {
    if (!id) {
      setData(null);
      return;
    }
    const fetch = async () => {
      const res = await FetchPostDetail(id, myId);

      setData(res);
      setIsLiked(res.is_liked);
    };

    fetch();
  }, [id]);

  return (
    <div className={styles.detailsPanel}>
      <button
        onClick={() => {
          onClose();
        }}
      >
        Close
      </button>
      <div>
        Owner Avatar:
        <div className="avatarHolder">
          <img
            src={data?.avatar != "" ? data?.avatar : "/default_pfp.webp"}
            className="avatar"
          />
        </div>
      </div>
      <p>Owner Name: {data?.alias.length > 0 ? data?.alias : data?.username}</p>
      <p style={{ whiteSpace: "pre-line" }}>{data?.content}</p>
      <p>Likes: {data?.likes}</p>
      {isLiked != null && (
        <button onClick={onLikeUnlike}>{isLiked ? "Unlike" : "Like"}</button>
      )}
    </div>
  );
}

export default PostDetails;
